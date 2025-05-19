import Breadcrumbs from "../../components/Breadcrumbs"

const ProductLayoutPage = ({breadcrumbItems, children}) => {
    return (
        <div>
            <header style={{background: "red"}}>Header</header>
            <Breadcrumbs items={breadcrumbItems} />
            <div style={{margin: "1rem 1.5rem"}}>
                {children}
            </div>
            <footer style={{background: "blue"}}>
                Footer
            </footer>
        </div>
    )
}

export default ProductLayoutPage