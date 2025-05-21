import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";
import links from "@/routes/links";
import { Outlet } from "react-router-dom";
import Footer from "../ClientLayout/Footer/Footer";

const array_of_key_values_links = Object.entries(links.panel);
const links_urls = [
  { label: "Rubikmap", link: "/" },
  ...array_of_key_values_links.map(([key, value]) => ({
    label: key,
    link: value,
  })),
];

const PanelLayout = () => {
  return (
    <div>
      <header>
        <Breadcrumbs items={links_urls} />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer>Footer</Footer>
    </div>
  );
};

export default PanelLayout;
