import { NavLink } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';

const Header = () => {
  const { wishlist, cartItems, items, search, setSearch, searchFilter, isLoggedIn, setIsLoggedIn, formMode, setFormMode} =
    useProduct();

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
              <NavLink
                className="nav-link btn btn-secondary bg-secondary text-light  py-1 px-4"
                to="/login"
              >
                {isLoggedIn ? 'My Profile' : 'Sign Up'}
              </NavLink>
              <NavLink className="nav-link position-relative" to="/wishlist">
                <i className="far fa-heart" style={{ fontSize: '22px' }} />
                {wishlist.length >= 0 && (
                  <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
              <NavLink className="nav-link position-relative" to="/cart">
                <i
                  className="fas fa-shopping-cart"
                  style={{ fontSize: '22px' }}
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
