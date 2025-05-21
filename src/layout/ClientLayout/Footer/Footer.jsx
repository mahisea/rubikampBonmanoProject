import styles from "./Footer.module.css";

const Footer = ({children}) => {
  return (
  <footer
   className={styles.root}>
    {children} 
    </footer>);
};

export default Footer;
