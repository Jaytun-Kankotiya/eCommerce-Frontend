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
      <nav className="navbar navbar-expand-lg py-2 fixed-top bg-white ">
        <div className="container d-flex justify-content-between align-items-center">
          <NavLink className="navbar-brand text-secondary mt-1 me-5" to="/">
            MyShoppingSite
          </NavLink>
          <form className="d-lg-block flex-grow-1 mt-1 mx-5 w-50">
            <input
              type="text"
              placeholder="Search for products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control me-2"
              aria-label="Search"
            />
          </form>
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
            <div className="navbar-nav d-flex align-items-center ms-auto gap-3">
              <div className="d-flex align-items-center">
                {/* {isLoggedIn && } */}
                {isLoggedIn ? (
                  <div className="dropdown profile-dropdown">
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        border: "2px solid #dee2e6",
                        padding: "2px",
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
                      className="dropdown-menu dropdown-menu-start shadow-sm"
                      aria-labelledby="profilprofileDropdowneDrop"
                    >
                      <li>
                        <Link className="dropdown-item" to={"/login"}>
                          👤 My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/orders"}>
                          📦 My Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/address"}>
                          🏠 My Address
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
                          🚪 Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <NavLink
                    className="nav-link btn btn-secondary bg-secondary text-light  py-1 px-4"
                    to="/login"
                  >
                    Sign Up
                  </NavLink>
                )}
              </div>
              <NavLink className="nav-link position-relative" to="/wishlist">
                <i className="far fa-heart" style={{ fontSize: "22px" }} />
                {wishlist.length >= 0 && (
                  <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
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
                  <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
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
