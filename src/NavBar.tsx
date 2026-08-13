import {NavLink} from "react-router";

function NavBar() {
    return (
        <>
            <nav>
                <NavLink to="/" end>Minesweeper</NavLink>
                <NavLink to="/login" end>Login</NavLink>
            </nav>
        </>
    )
}

export default NavBar