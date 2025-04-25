// items: [{label: "string", link: "string"}]
const Breadcrumbs = (props) => {
    return (
        <nav aria-label="Breadcrumb" {...props}>
            <ul style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                {props.items.map((item, index) => (
                    <li key={index}>
                        <a href={item.link}>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs;