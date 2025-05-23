import {useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import "./ProfileProduct.css";
import moment from "moment";

const makeBorderStyleByError = (bool) => ({
  border: "1px solid " + (bool ? "red" : "#abb"),
  borderRadius: 5,
  margin: "0 4px",
  padding: "5px",
  width: "350px"
});

const ProductFormManagement = ({
  onSubmit,
  data,
  onCancel,
  hideCloseButton = false,
  cancelButtonText = "Cancel",
}) => {
  const isCreateMode = !data;
  ////////////

  const [error, setError] = useState({});

  const [form, setForm] = useState({
    name: data?.name || "",
    description: data?.description || "",
    price: data?.price || "",
    category: data?.category || "",
    stock: data?.stock || "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((pre) => ({
    ...pre,
    [name]: value,
  }));

  if (error[name] && value.trim()) {
    setError((errors) => ({
      ...errors,
      [name]: false,
    }));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      name: !form.name,
      description: !form.description,
      price: !form.price,
      category: !form.category,
      stock: !form.stock,
    };
    console.log(newErrors);

    setError(newErrors);

    const hasError = Object.values(newErrors).some((err) => err);
    if (hasError) {
      return;
    } else{
     console.log("good without error");
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
          if (res.product) {
            console.log("success");
            onSubmit(res.product);
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
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.product) {
            console.log("success");
            onSubmit(res.product);
          } else {
            console.log("error");
          }
        });
    }
  };

  const isSubmitDisabled =
    error.name ||
    error.description ||
    error.category ||
    error.price ||
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
        min="1"
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
        min="0"
        style={makeBorderStyleByError(error.stock)}
        value={form.stock}
        placeholder="Stock"
        name="stock"
        onChange={handleChange}
      />
      <br /> <br />
      <button disabled={isSubmitDisabled} type="submit" style={{marginRight: "20px", }}>
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
      <h2>Product Management Page</h2>
      <h2>Table</h2>
      <button    style={{
              padding: "5px",
              marginLeft: "20px"
      }}onClick={() => setOpenCreateProductModal(true)}>
        Create Product
      </button>
      <br />
      <br />
      <label>Search : </label>
      <input
      style={{border: "solid 2px #abb",
              borderRadius: "5px",
              padding: "5px"
      }}
        type="text"
        placeholder="by Name & Category"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
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
                <tr key={products.id} >
                  <td>{products.name}</td>
                  <td>{products.description}</td>
                  <td>{products.category}</td>
                  <td>${products.price}</td>
                  <td>{products.stock}</td>
                  <td>{moment(products.createdAt).format('YYYY-MMM-DD HH:MM:SS')}</td>
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
