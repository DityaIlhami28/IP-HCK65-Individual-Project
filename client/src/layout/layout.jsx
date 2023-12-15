import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/searchBar";

export default function LayOut() {
    return (
        <>
        <NavBar />
        <Outlet />
        </>
    )
}