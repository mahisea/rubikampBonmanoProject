// items: [{label: "string", link: "string"}]
const Breadcrumbs = (props) => {
  return (
    <nav
      style={{
        background: "#abb",
        height: "60px",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="Breadcrumb"
      {...props}
    >
      <ul
        style={{
          display: "flex",
          gap: "1rem",
          marginRight: "10px",
          listStyle: "none",
        }}
      >
        {props.items.map((item, index) => (
          <li key={index} style={{ margin: "0 10px" }}>
            <a
              href={item.link}
              style={{
                color: "#333",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
