import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  //   const = navigate

  return (
    <div
    >
      <div
        style={{
          backgroundImage: "url('/11.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
          filter: theme === "blur" ? "blur(5px)" : "blur(0)",
        }}
      >
        <div style={{zIndex: "10"}}>
          <h1 style={{ textAlign: "center", fontSize:"80px" }}>Mahi</h1>
          <button
            onClick={() => {
              setTheme(theme === "blur" ? "none" : "blur");
            }}
          >
            Change Flter: {theme}
          </button>
          <Link to="/auth">
            <button>login / Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
