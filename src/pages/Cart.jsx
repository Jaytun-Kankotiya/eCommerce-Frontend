import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    cartItems,
    setCartItems,
    quantity,
    wishlist,
    increaseQuantity,
    decreaseQuantity,
    addAndRemoveFromWishlist,
    size,
    search,
    sizeHandler,
    wishListAddHandler,
    setSize,
    cartData,
    setCartData,
    discount,
    delivery,
    deliveryFee,
    totalCartValue,
  } = useProduct();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cartItems`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch the cart Items.");
        }
        const result = await response.json();
        setCartData(result.data);
        setCartItems(result.data.map((item) => item.id));
        setLoading(false);
      } catch (error) {
        console.log("Error sending cart request.");
        setLoading(false);
      }
    };
    fetchCart();
  }, [setCartItems]);


  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cartItems/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove from cart.");
      }
      setCartItems((prev) => prev.filter((id) => id !== productId));
      setCartData((prev) => prev.filter((item) => item.id !== productId));
      toast.info("Item removed from cart.");
    } catch (error) {
      console.log("Error removing Item from cart.", error);
    }
  };
  const displayItems = cartData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );


  const checkoutHandler = () => {
    const allSizeSelected = cartItems.every((id) => size[id]);

    if(allSizeSelected){
      navigate('/checkout')
    }else{
      toast.error("Please select a size before proceeding!")
    }
  }

 
  if (loading)
    return <h5 className="mt-5 container py-5 text-center">Loading cart...</h5>;

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container">
          <>
            {cartData.length > 0 ? (
              <>
                <h3 className="py-3 text-center">
                  My Cart ({cartData.length})
                </h3>
                <div className="row gx-md-5 gy-4">
                  <div className="col-lg-7">
                    {displayItems.slice().reverse().map((item) => (
                      <div className="card mb-4" key={item.id}>
                        <div className="row g-0">
                          <div className="col-md-5 col-12">
                            <Link to={`/productDetails/${item.id}`}>
                            <div className="w-100 h-100 overflow-hidden rounded-start">
                              <img
                                style={{
                                  objectFit: "cover",
                                  maxHeight: "325px"
                                }}
                                className="img-fluid w-100 h-100"
                                src={item.imageLink}
                                alt={item.name}
                              />
                              </div>
                            </Link>
                          </div>

                          <div className="col-md-7 col-12" key={item.id}>
                            <div className="card-body d-flex flex-column justify-content-between h-100">
                              <div>
                              <p className="fw-semibold fs-5">{item.name}</p>
                              <div className="d-flex align-items-center gap-2">
                                <h5 className="fw-bold mb-0">₹{item.price}</h5>
                                <h6
                                  className="text-muted mb-0 text-decoration-line-through"
                                  style={{ textDecoration: "line-through" }}
                                >
                                  ₹{item.price * 2}
                                </h6>
                                <span className="text-success small">50% off</span>
                              </div>

                              <div className="d-flex align-items-center mt-3">
                                <h6 className="mb-0">Quantity: </h6>
                                <div className="d-flex align-items-center ms-3">
                                  <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="btn btn-outline-danger btn-sm rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                    }}
                                  >
                                    <i
                                      className="bi bi-dash fs-5"
                                      style={{ fontSize: "22px" }}
                                    ></i>
                                  </button>
                                  <span
                                    className="mx-2 fw-semibold"
                                  >
                                    {quantity[item.id] || 1}
                                  </span>
                                  <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="btn btn-outline-success btn-sm rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                    }}
                                  >
                                    <i
                                      className="bi bi-plus fs-5"
                                    ></i>
                                  </button>
                                </div>
                              </div>

                              <div className="d-flex align-items-center gap-2 mt-3">
                                <h6 className="mb-0">Size: </h6>
                                {size[item.id] ? (
                                  <span
                                    className="badge bg-primary text-white"
                                  >
                                    {size[item.id]}
                                  </span>
                                ) : (
                                  <select
                                    onChange={(e) =>
                                      sizeHandler(item.id, e.target.value)
                                    }
                                    required
                                    name="size"
                                    id="size"
                                    className="form-select form-select-sm "
                                    style={{ minWidth: "100px" }}
                                  >
                                    <option value="" defaultValue>
                                      Select Size
                                    </option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                  </select>
                                )}
                              </div>

                              <h6 className="mt-3">
                                Total value: ₹
                                {item.price * (quantity[item.id] || 1)}
                              </h6>

                              <div className="d-flex flex-column gap-2 mt-3">
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="btn btn-secondary btn-sm"
                                >
                                  Remove From Cart
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    wishListAddHandler(item);
                                  }}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  {wishlist.includes(item.id)
                                    ? "Remove From Wishlist"
                                    : "Add to Wishlist"}
                                </button>
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="col-lg-5"
                  >
                    <div className="bg-white shadow-sm rounded p-4 sticky-top" style={{top: '100px'}}>
                      <h5>PRICE DETAILS</h5>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <p>
                          Price ({cartItems.length} item
                          {cartItems.length > 1 ? "s" : ""})
                        </p>
                        <p>₹{totalCartValue}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Discount</p>
                        <p>- ₹{discount}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Delivery Charges</p>
                        <p>{delivery}</p>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold">
                        <h5>TOTAL AMOUNT</h5>
                        <h5>
                          ₹
                          {totalCartValue +
                            (delivery === "Free Delivery" ? 0 : deliveryFee)}
                        </h5>
                      </div>
                      <hr />
                      <p className="text-center text-success">
                        You will save ₹{discount} on this order
                      </p>
                      <button
                        onClick={checkoutHandler}
                        type="button"
                        className="btn btn-primary w-100"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center py-5">
                  <h3 className="mt-5">Your cart is Empty</h3>
                  <p className="mt-2 text-muted">
                    Add products you love to buy
                  </p>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Cart;
