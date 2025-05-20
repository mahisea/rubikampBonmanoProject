import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
const ProductLayoutPage = ({ breadcrumbItems, children }) => {
  return (
    <div>
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <div style={{ margin: "1rem 1.5rem" }}>
        {children}
      </div>
        <Footer>footer</Footer>
    </div>
  );
};

export default ProductLayoutPage;
