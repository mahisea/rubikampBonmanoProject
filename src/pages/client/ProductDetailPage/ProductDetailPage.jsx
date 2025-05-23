import ProductLayoutPage from "@/layout/ClientLayout/ProductLayoutPage/ProductLayoutPage.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css"

const breadcrumbsBusiness  = [
  { label: "دانه قهوه اسپرسو جیورنو", link: "/bussiness/products/1" },
  { label: "دانه اسپرسو", link: "/bussiness/products/2" },
  { label: "قهوه اسپرسو", link: "/bussiness/products/3" },
  { label: "محصولات بن‌مانو", link: "/bussiness/products/4" },
  { label: "خانه", link: "/bussiness/products/4" },
];

// const images = ["banana", "apple", "orange", "pineapple", "strawberry", "watermelon", "mango", "grape", "pear", "peach"]
const images = ["1", "2", "3"];

const SliderDot = ({ text, onClick, key, isSelected }) => {
  return (
    <div
      key={key}
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? "green" : "gray",
        padding: "4px",
        color: "white",
        borderRadius: "100%",
        cursor: "pointer",
      }}
    >
      {text}
    </div>
  );
};

const Slider = ({ images }) => {
  const [selected, setSelected] = useState(0);

  const handleOnBefore = () => {
    setSelected(selected >= 1 ? selected - 1 : selected);
  };

  const handleOnAfter = () => {
    setSelected(selected + 1);
  };

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #e3ce10",
      }}
    >
      <div
        id="selected-image"
        style={{
          border: "1px solid #abb",
          width: "100px",
          height: "100px",
        }}
      >
        <img src={images[selected]} alt="" width={100} height={100} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
          // border: '1px solid #',
          gap: "4px",
        }}
      >
        <SliderDot onClick={handleOnBefore} text={"<"} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          {images.map((image, index) => (
            <SliderDot
              key={index}
              onClick={() => setSelected(index)}
              text={index + 1}
              isSelected={selected === index}
            />
          ))}
        </div>
        <SliderDot onClick={handleOnAfter} text={">"} />
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/products/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setProduct(res);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(product.images);

  return (
    <ProductLayoutPage breadcrumbItems={breadcrumbsBusiness} >
      <h1 className="h1" >{product?.name}</h1>
     <h2 className="h2"><span className="span">description : </span>{product?.description}</h2>
      <h2 className="h2"><span className="span">Categpry : </span>{product?.category}</h2>
      <h2 className="h2"><span className="span">Price : </span>${product?.price}</h2>

      <Slider images={images} />
    </ProductLayoutPage>
  );
};

export default ProductDetailPage;
// http://localhost:5173/product/3
