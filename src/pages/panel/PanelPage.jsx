import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const PanelPage = () => {
    const {user} = useContext(UserContext);
    console.log({user});
    return (
        <div>PanelPage test</div>
    )
}

export default PanelPage;