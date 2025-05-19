import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";

const makeBorderStyleByError = (bool) => ({
  border: "1px solid " + (bool ? "red" : "#abb"),
  color: "black",
  borderRadius: 5,
  margin: "0 4px",
  padding: "5px",
});

const ProductFormManagement = ({
  onSubmit,
  data,
  onCancel,
  hideCloseButton = false,
  cancelButtonText = "Cancel",
}) => {
  const isCreateMode = !data;

  const [error, setError] = useState({});

  const [form, setForm] = useState({
    name: data?.name || "",
    description: data?.description || "",
    price: data?.price || "",
    category: data?.category || "",
    stock: data?.stock || "",
    createdAt: data?.createdAt || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("log");
    e.preventDefault();
    const newErrors = {
      name: !form.name,
      description: !form.description,
      price: !form.price,
      category: !form.category,
      stock: !form.stock,
      createdAt: !form.createdAt,
    };

    setError(newErrors);

    const hasError = Object.values(newErrors).some((err) => err);
    if (hasError) {
      return;
    }

    if (isCreateMode) {
      // create product
      fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.user) {
            console.log("success");
            onSubmit(res.user);
          } else {
            console.log("error");
          }
        });
      ////////
    } else {
      fetch("http://localhost:8000/api/products/" + data.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      })
        /////
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.user) {
            console.log("success");
            onSubmit(res.user);
          } else {
            console.log("error");
          }
        }); ////////////////////////
    }
  };

  const isSubmitDisabled =
    error.name ||
    error.description ||
    error.category ||
    error.price ||
    error.createdAt ||
    error.stock;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        style={makeBorderStyleByError(error.name)}
        value={form.name}
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <br /> <br />
      <input
        type="text"
        style={makeBorderStyleByError(error.description)}
        value={form.description}
        placeholder="Description"
        name="description"
        onChange={handleChange}
      />
      <br /> <br />
      <input
        type="number"
        style={makeBorderStyleByError(error.price)}
        value={form.price}
        placeholder="Price"
        name="price"
        onChange={handleChange}
      />
      <br /> <br />
      <input
        type="text"
        style={makeBorderStyleByError(error.category)}
        value={form.category}
        placeholder="Category"
        name="category"
        onChange={handleChange}
      />
      <br /> <br />
      <input
        type="number"
        style={makeBorderStyleByError(error.stock)}
        value={form.stock}
        placeholder="Stock"
        name="stock"
        onChange={handleChange}
      />
      <br /> <br />
      <input
        type=" date"
        style={makeBorderStyleByError(error.createdAt)}
        value={form.createdAt}
        placeholder="CreatedAt"
        name="createdAt"
        onChange={handleChange}
      />
      <br /> <br />
      <button disabled={isSubmitDisabled} type="submit">
        {isCreateMode ? "create" : "update"}
      </button>
      {!hideCloseButton && (
        <button onClick={() => onCancel()}>{cancelButtonText}</button>
      )}
    </form>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const fetchProducts = async () => {
    console.log("fetchProducts");

    const res = await fetch("http://localhost:8000/api/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      console.error("Failed to fetch products", data);
      return;
    }
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  /////////////////

  const handleDeleteProduct = (id) => {
    setLoading(true);
    fetch(`http://localhost:8000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      //////////////////////////
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          fetchProducts();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {deleteProduct && (
        <Modal
          onClose={() => setDeleteProduct(null)}
          onSubmit={() => {
            handleDeleteProduct(deleteProduct.id);
          }}
          title="Delete Product"
          description={`Are you sure you want to delete ${deleteProduct.name}?`}
        />
      )}
      {openCreateProductModal && (
        <Modal
          hideCloseButton={true}
          hideSubmitButton={true}
          title="Create product"
          description={
            <ProductFormManagement
              data={null}
              onSubmit={(newProduct) => {
                setProducts([...products, newProduct]);
                setOpenCreateProductModal(false);
              }}
              onCancel={() => setOpenCreateProductModal(false)}
              cancelButtonText="close modal"
            />
          }
        />
      )}
      {editProduct && (
        <Modal
          hideCloseButton={true}
          hideSubmitButton={true}
          title="Edit Product"
          description={
            <ProductFormManagement
              data={editProduct}
              onSubmit={() => {
                fetchProducts();
                setEditProduct(null);
              }}
              onCancel={() => setEditProduct(null)}
              cancelButtonText="close modal"
            />
          }
        />
      )}
      <h2>Profile Product Page</h2>
      <h2>Table</h2>
      <button onClick={() => setOpenCreateProductModal(true)}>
        Create Product
      </button>
      <div>Search</div>
      <br />
      <input
        type="text"
        placeholder="by Name & Category"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table style={{ border: "solid #abb", width: "80%", margin: "20px" }}>
        <thead>
          <tr
            style={{
              textAlign: "left",
              background: "lightGray",
            }}
          >
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div>Loading...</div>
          ) : (
            products
              .filter(
                (products) =>
                  products.name.toUpperCase().includes(search.toUpperCase()) ||
                  products.category.toUpperCase().includes(search.toUpperCase())
              )
              .map((products) => (
                <tr key={products.id} style={{ background: "#f4f4f4",
                 }}>
                  <td style={{padding : "5px"}}>{products.name}</td>
                  <td>{products.description}</td>
                  <td>{products.category}</td>
                  <td>{products.price}</td>
                  <td>{products.stock}</td>
                  <td>{products.createdAt}</td>

                  <td>
                    <button
                      onClick={() => {
                        setEditProduct(products);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => setDeleteProduct(products)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
