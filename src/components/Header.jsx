import { Link, NavLink } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";

const Header = () => {
  const {
    wishlist,
    cartItems,
    logoutHandler,
    items,
    search,
    setSearch,
    searchFilter,
    isLoggedIn,
    setIsLoggedIn,
    formMode,
    setFormMode,
  } = useProduct();

  return (
    <>
      <nav className="navbar navbar-expand-lg py-2 fixed-top bg-white shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand text-secondary" to="/">
            myShoppingSite
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex flex-column flex-lg-row justify-content-between mt-2 w-100 mt-lg-0 align-items-center gap-3">
              <form className="w-100 w-lg-50">
                <input
                  type="text"
                  placeholder="Search for products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control me-2"
                  aria-label="Search"
                />
              </form>
              <div className="navbar-nav d-flex align-items-center gap-3 ms-lg-auto">
                {/* {isLoggedIn && } */}
                {isLoggedIn ? (
                  <div className="dropdown">
                    <img
                      style={{
                        width: "36px",
                        height: "36px",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        padding: "2px",
                        objectFit: "cover",
                        transition: "0.3s",
                        backgroundColor: "#fff",
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                      id="profileDropdown"
                      alt="Profile"
                      className="rounded-circle dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu dropdown-menu-end shadow-sm"
                      aria-labelledby="profileDropdown"
                      style={{
                        minWidth: "180px",
                        borderRadius: "10px",
                        // fontSize: "0.95rem",
                      }}
                    >
                      <li>
                        <Link className="dropdown-item" to={"/login"}>
                          👤 &nbsp; My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/orders"}>
                          📦 &nbsp; My Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/address"}>
                          🏠 &nbsp; My Address
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          onClick={logoutHandler}
                          className="dropdown-item text-danger"
                        >
                          🚪 &nbsp; Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <NavLink
                    className="nav-link btn btn-secondary text-light  py-1 px-3"
                    to="/login"
                  >
                    Sign Up
                  </NavLink>
                )}
              </div>
              <NavLink className="nav-link position-relative" to="/wishlist">
                <i className="far fa-heart" style={{ fontSize: "22px" }} />
                {wishlist.length >= 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
              <NavLink className="nav-link position-relative" to="/cart">
                <i
                  className="fas fa-shopping-cart"
                  style={{ fontSize: "22px" }}
                />
                {wishlist.length >= 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
