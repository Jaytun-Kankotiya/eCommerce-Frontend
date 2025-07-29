import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useProduct } from '../contexts/ProductContext';
import { useState, useEffect } from 'react';

const ProductDetails = () => {
  const {productId}  = useParams();
  const [product, setProduct] = useState(null)
  const {
    items,
    wishlist,
    setWishlist,
    cartItems,
    setCartItems,
    size,
    setSize,
    quantity, setQuantity,
    searchFilter,
    loading, setLoading,
    sizeHandler,
    wishListAddHandler,
    addAndRemoveFromCart,
    decreaseQuantity,
    increaseQuantity,
    categoryProducts, setCategoryProducts
  } = useProduct();

  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://e-commerce-backend-umber-nu.vercel.app/productDetails/${productId}`)
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.log("Error fetching product.", error)
        setLoading(false)
      }
    }
    fetchProduct()
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [productId]   
)

if(loading) return <h5 className='mt-5 container py-5 text-center'>Loading...</h5>
if(!product) return <p className='container py-3'>Product Not Found.</p>

  
  const originalPrice = product.price * 2;

  const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
      <div>
        {[...Array(totalStars)].map((_, index) => {
          return (
            <span
              key={index}
              style={{
                color: index < rating ? '#FFD700' : '#ccc',
                fontSize: '25px',
              }}
            >
              &#9733;
            </span>
          );
        })}
      </div>
    );
  };



  return (
    <div className="bg-light">
      <Header />
      <div className="">
        <div className="container bg-white mt-5 pt-4">
          {product && (
            <>
              <div className="row g-4">
                <div className="col-md-4">
                  <div style={{ maxWidth: '600px', width: '100%' }}>
                    <img
                      src={product.imageLink}
                      alt={product.name}
                      className="img-fluid mt-3 pt- 3"
                      style={{
                        height: '500px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Link to="/cart" className="btn btn-primary w-100  mt-3">
                      Buy Now
                    </Link>
                    <button
                      onClick={() => addAndRemoveFromCart(product)}
                      className="btn btn-secondary w-100  mt-2"
                    >
                      {cartItems.includes(product.id)
                        ? 'Remove from the cart'
                        : 'Add to cart'}
                    </button>
                  </div>
                </div>

                <div className="col-md-8 p-3">
                  <h5>{product.name}</h5>
                  <div className="d-flex align-items-center gap-2 mb-3 fs-5">
                    <p className="mb-0 mt-1">{product.rating}</p>
                    <StarRating rating={product.rating} />
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bolder">₹{product.price} </h4>
                    <h4
                      className="text-secondary ms-2"
                      style={{ textDecoration: 'line-through' }}
                    >
                      ₹{originalPrice}
                    </h4>
                    <h4 className="text-secondary">
                    {(product.price / originalPrice) * 100}% off
                  </h4>
                  </div>


                  <div className="d-flex align-items-center mt-3 mb-3 gap-3">
                    <h5 className="mb-0">Quantity: </h5>
                    <div className='d-flex align-items-center gap-2'>
                    <button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                      className="btn btn-outline-danger rounded-circle p-0 d-flex justify-content-center align-items-center"
                      style={{
                        width: '36px',
                        height: '36px',
                      }}
                    >
                      <i className='bi bi-dash' style={{ fontSize: '22px' }}></i>
                    </button>
                    <span
                      style={{
                        minWidth: '28px',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: 500
                      }}
                    >
                      {quantity[product.id] || 1}
                    </span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="btn btn-outline-success rounded-circle p-0 d-flex justify-content-center align-items-center"
                      style={{
                        width: '36px',
                        height: '36px',
                      }}
                    >
                      <i className='bi bi-plus' style={{ fontSize: '22px' }}></i>
                    </button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-4 gap-2 flex-wrap">
                    <h5 className="me-2 mt-1 mb-2">Size: </h5>
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sizeOption) => (
                      <div className="mb-3" key={sizeOption}>
                        <label
                          key={sizeOption}
                          className={`btn btn-outline-secondary d-flex justify-content-center align-items-center p-0 ms-1
                     ${
                       size[product.id] === sizeOption
                         ? 'bg-light text-primary border-primary'
                         : ''
                     }`}
                          style={{
                            cursor: 'pointer',
                            width: '40px',
                            height: '40px',
                            fontWeight: '500',
                            borderRadius: '0.5rem',
                          }}
                        >
                          <input
                            type="radio"
                            name="size"
                            value={sizeOption}
                            checked={size === sizeOption}
                            onChange={() =>
                              sizeHandler(product.id, sizeOption)
                              // setSize((prev) => ({
                              //   ...prev,
                              //   [product.id]: sizeOption,
                              // }))
                            }
                            style={{ display: 'none' }}
                          />
                          {sizeOption}
                        </label>
                      </div>
                    ))}
                  </div>
                  <hr />

                  <div className="d-flex flex-wrap justify-content-start align-items-start py-2 gap-4">
                    <div className="text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/4989/4989753.png"
                        alt="Refund"
                        style={{ height: '50px', width: '50px' }}
                      />
                      <p>10 days Returnable</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/4766/4766874.png"
                        alt="Pay On Delivery"
                        style={{ height: '50px', width: '50px' }}
                      />
                      <p>Pay on Delivery</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/11425/11425578.png"
                        alt="Delivery"
                        style={{ height: '50px', width: '50px' }}
                      />
                      <p>
                        {product.price > 1900
                          ? 'Free Delivery'
                          : `Add ${
                              1900 - product.price
                            } value item to get free delivery`}
                      </p>
                    </div>
                    <div className="text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/9359/9359491.png"
                        alt="Secured Payment"
                        style={{ height: '50px', width: '50px' }}
                      />
                      <p>Secure Payment</p>
                    </div>
                  </div>
                  <hr />

                  <div>
                    <h4>Description:</h4>
                    <ul>
                      {product?.descriptions?.map((desc) => (
                        <li>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          <hr />
          <div>
            <h4 className="ms-2">More items you may like in apparel</h4>
            <div className="row py-2">
              {categoryProducts
                .filter((items) => items.category === product.category && items.id !== product.id)
                .slice(0, 8)
                .map((item) => (
                  <div className="col-md-3" >
                    <div className="card mb-2" key={item.id}>
                      <Link to={`/productDetails/${item.id}`}>
                        <img
                          className="card-img-top"
                          src={item.imageLink}
                          alt={item.name}
                          style={{ height: '300px', objectFit: 'cover' }}
                        />
                      </Link>
                      <button
                        onClick={() => wishListAddHandler(item)
                        }
                        type="button"
                        className="btn position-absolute top-0 end-0 m-2 p-0"
                        style={{
                          color: wishlist.includes(item.id)
                            ? '#dc3545'
                            : 'rgba(255, 255, 255, 0.7)',
                          top: '10px',
                          right: '10px',
                          borderRadius: '50%',
                          fontSize: '24px',
                          transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (!wishlist.includes(item.id)) {
                            e.currentTarget.style.color = '#dc3545';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!wishlist.includes(item.id)) {
                            e.currentTarget.style.color =
                              'rgba(255, 255, 255, 0.7)';
                          }
                        }}
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                      <div className="card- body text-center">
                        <p className="mt-2">{item.name}</p>
                        <h4>₹{item.price}</h4>
                      </div>
                      <button
                        onClick={() => addAndRemoveFromCart(item)
                        }
                        className="btn btn-primary"
                      >
                        {cartItems.includes(item.id)
                          ? 'Remove From Cart'
                          : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
