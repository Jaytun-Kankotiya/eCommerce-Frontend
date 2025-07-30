import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useProduct } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const {
    wishlist,
    setWishlist,
    cartItems,
    addAndRemoveFromCart,
    search,
    isLoggedIn, setIsLoggedIn
  } = useProduct();

  const [wishListItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/wishlist`,{
          headers: {
          'Authorization': `Bearer ${token}`
        }
        })
        if(!response.ok){
        throw new Error("Failed to fetch wishlist Items.")
        }
        const result = await response.json()
        setLoading(false)
        setWishlistItems(result.data)    
        setWishlist(result.data.map((item) => item.id))
      } catch (error) {
        console.log("Error fetching wishlist.", error)
        setLoading(false)
      }
  } 
  fetchWishlist()
  }, [])

  const removeItems = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(!response.ok){
        throw new Error("Failed to remove from wishlist.")
      }
      setWishlist((prev) => prev.filter((id) => id !== productId))
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
      toast.info("Item removed from wishlist.")
    } catch (error) {
      console.log("Error removing item from wishlist", error)
    }
  }

  const filteredItemBySearch = wishListItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    
  if(loading) return <h5 className='mt-5 container py-5 text-center'>Loading wishlist...</h5>

  return (
    <>
      <Header />
      <div>
        {wishListItems.length > 0 ? (
          <div className='container'>
            <h3 className="text-center mt-3">My Wishlist ({filteredItemBySearch.length})</h3>
            <div className="row px-4 mt-4">
              {filteredItemBySearch.map((product) => (
                <div key={product.id} className="col-md-3">
                  <div className="card mb-3">
                    <Link to={`/productDetails/${product.id}`}>
                      <img
                        className="card-img-top"
                        src={product.imageLink}
                        alt={product.name}
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                    </Link>
                    <button
                      onClick={() => removeItems(product.id)}
                      type="button"
                      className="btn position-absolute top-0 end-0 m-2 p-0"
                      style={{
                        color: wishlist.includes(product.id)
                          ? '#dc3545'
                          : 'rgba(255, 255, 255, 0.7)',
                        top: '10px',
                        right: '10px',
                        borderRadius: '50%',
                        fontSize: '24px',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!wishlist.includes(product.id)) {
                          e.currentTarget.style.color = '#dc3545';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!wishlist.includes(product.id)) {
                          e.currentTarget.style.color =
                            'rgba(255, 255, 255, 0.7)';
                        }
                      }}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                    <div className="card-body text-center">
                      <p className="fw-bold">{product.name}</p>
                      <h4>₹{product.price}</h4>
                    </div>
                    <button
                      onClick={() => addAndRemoveFromCart(product)}
                      className="btn btn-secondary"
                    >
                      {cartItems.includes(product.id)
                        ? 'Remove from Cart'
                        : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center bg-light py-5 ">
            <h3 className="mt-5">Your wishlist is empty</h3>
            <p className="text-muted mt-1">
              Add products you love to your wishlist
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
