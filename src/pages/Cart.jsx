import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useProduct } from '../contexts/ProductContext';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    cartData, setCartData,
    discount,
    delivery,
    deliveryFee,
    totalCartValue,
  } = useProduct();

  const [loading, setLoading] = useState(true)
    console.log(cartData)

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:3000/cartItems',{
          headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(!response.ok){
        throw new Error('Failed to fetch the cart Items.')
      }
      const result = await response.json()
      setCartData(result.data)
      setCartItems((result.data.map((item) => item.id)))
      setLoading(false)
    } catch (error) {
      console.log("Error sending cart request.")
      setLoading(false)
    }
    }
    fetchCart()
  }, [setCartItems])


  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/cartItems/${productId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(!response.ok){
        throw new Error("Failed to remove from cart.")
      }
      setCartItems((prev) => prev.filter((id) => id !== productId))
      setCartData((prev) => prev.filter((item) => item.id !== productId))
      toast.info("Item removed from cart.")
    } catch (error) {
      console.log("Error removing Item from cart.", error)
    }
  }

  const displayItems = cartData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  if(loading) return <h5 className='mt-5 container py-5 text-center'>Loading cart...</h5>



  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container py-3 mt-3">
          <>
            {cartData.length > 0 ? (
              <>
                <h3 className="mt-5 py-3 text-center">
                  My Cart ({cartData.length})
                </h3>
                <div className="row">
                  <div className="col-md-6 ms-1">
                    {displayItems.map((item) => (
                      <div className="card mb-3" key={item.id}>
                        <div className="row">
                          <div className="col-md-6">
                            <Link to={`/productDetails/${item.id}`}>
                              <img
                                style={{
                                  height: '332px',
                                  width: '300px',
                                  objectFit: 'cover',
                                }}
                                className="card-img-left"
                                src={item.imageLink}
                                alt={item.name}
                              />
                            </Link>
                          </div>

                          <div className="col-md-6">
                            <div className="card-body mt-1">
                              <p>{item.name}</p>
                              <div className="d-flex align-items-center gap-2">
                                <h4 className="fw-bolder">₹{item.price}</h4>
                                <h4
                                  className="text-secondary ms-2"
                                  style={{ textDecoration: 'line-through' }}
                                >
                                  ₹{item.price * 2}
                                </h4>
                                <h5 className="text-secondary">50% off</h5>
                              </div>

                              <div className="d-flex align-items-center py-2">
                                <h6 className="mb-0">Quantity: </h6>
                                <div className='d-flex align-items-center'>
                                <button
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="btn btn-outline-danger rounded-circle ms-3 d-flex justify-content-center align-items-center"
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                  }}
                                >
                                  <i className='bi bi-dash' style={{ fontSize: '22px' }}></i>
                                </button>
                                <span
                                  className="mb-0 ms-2"
                                  style={{
                                    minWidth: '26px',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    fontWeight: 500
                                  }}
                                >
                                  {quantity[item.id] || 1}
                                </span>
                                <button
                                  onClick={() => increaseQuantity(item.id)}
                                  className="btn btn-outline-success rounded-circle ms-2 d-flex justify-content-center align-items-center"
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                  }}
                                >
                                  <i className='bi bi-plus' style={{ fontSize: '22px' }}></i>
                                </button>
                                </div>
                              </div>
                              
                              <div className='d-flex align-items-center py-2 gap-1'>
                                <h6 className='me-1 mb-0'>Size: </h6>
                                {size[item.id] ? 
                                  (   <span
                                    className="badge bg-primary text-white"
                                    style={{ minWidth: "50px", textAlign: "center" }}
                                    >
                                    {size[item.id]}
                                    </span>
                                    )
                                :(
                                  <select onChange={(e) => sizeHandler(item.id, e.target.value )} required name="size" id="size" className='form-select form-select-sm ' style={{minWidth: '50px'}}>
                                  <option value="" defaultValue>Select Size</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                  <option value="XXL">XXL</option>
                                 </select>)
                                 }
                              </div>
                              
                              <h6 className="mt-2">
                                Total value: ₹
                                {item.price * (quantity[item.id] || 1)}
                              </h6>

                              <div className="d-flex flex-column gap-2 mt-3">
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="btn btn-secondary"
                                >
                                  Remove From Cart
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    wishListAddHandler(item);
                                  }}
                                  className="btn btn-outline-secondary"
                                >
                                  {wishlist.includes(item.id)
                                    ? 'Remove From Wishlist'
                                    : 'Add to Wishlist'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="col-md-4 ms-5 bg-white shadow-sm rounded py-4"
                    style={{
                      position: 'sticky',
                      top: '100px',
                      alignSelf: 'start',
                    }}
                  >
                    <div className="px-2">
                      <h4>PRICE DETAILS</h4>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <p>
                          Price ({cartItems.length} item
                          {cartItems.length > 1 ? 's' : ''})
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
                      <div className="d-flex justify-content-between">
                        <h5>TOTAL AMOUNT</h5>
                        <h5>
                          ₹
                          {totalCartValue +
                            (delivery === 'Free Delivery' ? 0 : deliveryFee)}
                        </h5>
                      </div>
                      <hr />
                      <p className="text-center">
                        You will save ₹{discount} on this order
                      </p>
                      <Link to={"/checkout"} type="button" className="btn btn-primary w-100">
                        Checkout
                      </Link>
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
