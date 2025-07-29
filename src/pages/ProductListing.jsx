import { useProduct } from '../contexts/ProductContext';
import Header from '../components/Header';
import { data, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../useFetch'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductListing = () => {

  const {
    items,
    wishlist,
    setWishlist,
    cartItems,
    setCartItems,
    addAndRemoveFromCart,
    ratingFilter,
    setRatingFilter,
    priceFilter,
    setPriceFilter,
    category,
    setCategory,
    search,
    searchFilter,
    loading,
    setLoading,
    wishListAddHandler,
    productDetailsPage,
    categoryProducts, setCategoryProducts
  } = useProduct();

  const {category: renderPage} = useParams();

  const productCategory = async () => {
    try {
      const response = await fetch(`https://e-commerce-backend-umber-nu.vercel.app/productListing`)
      // console.log(response)
      if(response.ok){
        const data = await response.json()
        setCategoryProducts(data)
        setLoading(false)
        // console.log(data)
      }
    } catch (error) {
      console.log("Error fetching products.")
      setLoading(false)
    }
  }


  const ratingHandler = (e) => {
    setRatingFilter(e.target.value);
  };

  const priceHandler = (e) => {
    setPriceFilter(e.target.value);
  };

  const categoryHandler = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const filteredCategory = (categoryProducts
    .filter(
      (item) => {
        const categoryMatch = category.length === 0 || category.includes(item.category)
        const ratingMatch = item.rating >= Number(ratingFilter || 0)
        const searchMatch =  item.name.toLowerCase().includes(search?.toLowerCase() || '')
        return categoryMatch && ratingMatch && searchMatch
      }
    )
    .sort((a, b) => {
      if (priceFilter === 'lowToHigh') return a.price - b.price;
      if (priceFilter === 'highToLow') return b.price - a.price;
      return 0;
    })
    
  )

  useEffect(() => {
    setLoading(true)
    productCategory()
    if (category.length === 0) {
    setCategory([renderPage]);
  }
  }, [renderPage])



  if(loading) return <h5 className='mt-5 container py-5 text-center'>Loading...</h5>
  if(!categoryProducts.length) return <h5 className='mt-5 container py-5 text-center'>Failed to fetch the product...</h5>

  return (
    <>
      <Header />
      <div className="d-flex row mt-5 mx-2">
        <div className="col-md-2 mt-5">
          <div className="mx-1 position-sticky" style={{ top: '100px' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="ms-0">Filters</h4>
              <button
                onClick={() => {
                  setRatingFilter('');
                  setPriceFilter('');
                  setCategory([renderPage]);
                }}
                className="btn me-2 btn-outline-secondary"
              >
                Clear
              </button>
            </div>
            {/* <br />
            <div>
              <h4>Price</h4>
            </div> */}
            <br />
            <div>
              <h4>Category</h4>
              <input
                value="Men"
                onChange={categoryHandler}
                checked={category.includes('Men')}
                className="form-check-input me-2"
                type="checkbox"
              />
              Men Clothing
              <br />
              <input
                value="Women"
                checked={category.includes('Women')}
                onChange={categoryHandler}
                className="form-check-input me-2"
                type="checkbox"
              />
              Women Clothing
              <br />
              <input
                value="Kids"
                onChange={categoryHandler}
                checked={category.includes('Kids')}
                className="form-check-input me-2"
                type="checkbox"
              />
              Kids Clothing
              <br />
              <input
                value="Accessories"
                checked={category.includes('Accessories')}
                onChange={categoryHandler}
                className="form-check-input me-2"
                type="checkbox"
              />
              Accessories
            </div>
            <br />
            <div>
              <h4>Rating</h4>
              <input
                className="form-check-input me-2"
                type="radio"
                name="rating"
                value="4"
                checked={ratingFilter === '4'}
                onChange={ratingHandler}
              />
              4 Stars and above
              <br />
              <input
                className="form-check-input me-2"
                type="radio"
                name="rating"
                value="3"
                checked={ratingFilter === '3'}
                onChange={ratingHandler}
              />
              3 Stars and above
              <br />
              <input
                className="form-check-input me-2"
                type="radio"
                name="rating"
                value="2"
                checked={ratingFilter === '2'}
                onChange={ratingHandler}
              />
              2 Stars and above
              <br />
              <input
                className="form-check-input me-2"
                type="radio"
                name="rating"
                value="1"
                checked={ratingFilter === '1'}
                onChange={ratingHandler}
              />
              1 Stars and above
            </div>
            <br />

            <div>
              <h4>Sort by</h4>
              <input
                className="form-check-input me-2"
                type="radio"
                name="price"
                value="lowToHigh"
                checked={priceFilter === 'lowToHigh'}
                onChange={priceHandler}
              />
              Price - Low to High
              <br />
              <input
                className="form-check-input me-2"
                type="radio"
                name="price"
                value="highToLow"
                checked={priceFilter === 'highToLow'}
                onChange={priceHandler}
              />
              Price - High to Low
            </div>
            <br />
          </div>
        </div>

        <div className="col-md-10 bg-light rounded mt-3">
          <div className="p-3 mx-3 mt-2">
            <h3>
              Showing All Products{' '}
              <span>(showing {filteredCategory.length} products)</span>
            </h3>

            <div className="row">
              {filteredCategory.map((product) => (
                <div className="col-md-3" key={product.id}>
                  <div className="card mb-3 mt-2">
                    <Link to={`/productDetails/${product.id}`}>
                      <img
                        className="card-img-top"
                        src={product.imageLink}
                        alt={product.name}
                        style={{ objectFit: 'cover', height: '300px' }}
                      />
                    </Link>
                    <button
                      onClick={() =>{

                        wishListAddHandler(product)}
                      }
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
                      <p>{product.name}</p>
                      <h4>₹{product.price}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => addAndRemoveFromCart(product)}
                      className="btn btn-primary"
                    >
                      {cartItems.includes(product.id)
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
    </>
  );
};

export default ProductListing;
