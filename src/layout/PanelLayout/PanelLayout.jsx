import Breadcrumbs from "@/components/Breadcrumbs";
import links from "@/routes/links";
import { Outlet } from "react-router-dom";

const array_of_key_values_links = Object.entries(links.panel);
const links_urls = [
    {label: 'Rubikmap', link: '/'},
    ...array_of_key_values_links.map(([key, value]) => ({label: key, link: value}))
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
            <footer>footer</footer>
        </div>
    )
}

export default PanelLayout