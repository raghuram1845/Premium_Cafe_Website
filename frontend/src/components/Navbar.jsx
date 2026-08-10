import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={closeMenu}
                >
                    Premium Cafe
                </Link>

                <button
                    type="button"
                    className="mobile-menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div
                    className={`navbar-content ${
                        menuOpen ? "navbar-content-open" : ""
                    }`}
                >

                    <div className="navbar-links">

                        <NavLink
                            to="/"
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/menu"
                            onClick={closeMenu}
                        >
                            Menu
                        </NavLink>

                        <NavLink
                            to="/events"
                            onClick={closeMenu}
                        >
                            Events
                        </NavLink>

                        {isAuthenticated && !isAdmin && (
                            <NavLink
                                to="/reservations"
                                onClick={closeMenu}
                            >
                                Reservations
                            </NavLink>
                        )}

                        <NavLink
                            to="/contact"
                            onClick={closeMenu}
                        >
                            Contact
                        </NavLink>

                    </div>


                    <div className="navbar-actions">

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="navbar-login"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="navbar-register"
                                    onClick={closeMenu}
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
    to={
        isAdmin
            ? "/admin"
            : "/dashboard"
    }
    className="navbar-account"
    onClick={closeMenu}
>
    {isAdmin
        ? "Admin Dashboard"
        : "My Dashboard"}
</Link>

{!isAdmin && (
    <Link
        to="/profile"
        className="navbar-account"
        onClick={closeMenu}
    >
        My Profile
    </Link>
)}

<button
    type="button"
    className="navbar-logout"
    onClick={handleLogout}
>
    Logout
</button>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;