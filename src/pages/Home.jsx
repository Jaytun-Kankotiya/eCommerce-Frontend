import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useProduct } from '../contexts/ProductContext';

const Home = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  const {setPriceFilter, setCategory, setRatingFilter} = useProduct()

  useEffect(() => {
    setPriceFilter('')
    setRatingFilter('')
    setCategory('')
  })

  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3">
            <Link
              to={`/productListing/Men`}
              className="nav-link"
            >
              <img
              className='rounded'
                src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJ3MlMjBjbG90aGluZ3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Men's Fashion"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
              <h5 className="text-center mt-1">Men</h5>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to={`/productListing/Women`}
              className="nav-link"
            >
              <img
              className='rounded'
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW5zJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Men's Fashion"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
              <h5 className="text-center mt-1">Women</h5>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to={`/productListing/Kids`}
              className="nav-link"
            >
              <img
              className='rounded'
                src="https://plus.unsplash.com/premium_photo-1675183690442-b5de4b8a3571?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2lkcyUyMGNsb3RoaW5nfGVufDB8fDB8fHww"
                alt="Men's Fashion"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
              <h5 className="text-center mt-1">Kids</h5>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to={`/productListing/Accessories`}
              className="nav-link"
            >
              <img
              className='rounded'
                src="https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Men's Fashion"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
              <h5 className="text-center mt-1">Accessories</h5>
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-3">
          <div className="col-md-6">
            <Link to={`/productListing/offers`}>
              <img
              className='rounded'
                src="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGNsb3RoaW5nfGVufDB8fDB8fHww"
                alt="Clothing"
                style={{ height: '500px', width: '100%' }}
              />
            </Link>
          </div>
          <div className="col-md-6">
            <Link to={`/productListing/sale`}>
              <img
              className='rounded'
                src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGNsb3RoaW5nfGVufDB8fDB8fHww"
                alt="Clothing"
                style={{ height: '500px', width: '100%' }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row g-4">
          <div className="col-md-6 p-4 bg-light mb-3">
            <div className="row p-3">
              <div className="col-md-4">
                <Link to={`/productListing/summer`}>
                  <img
                  className='rounded'
                    src="https://images.unsplash.com/photo-1633394713592-0869b6b51950?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHN1bW1lciUyMHNhbGV8ZW58MHx8MHx8fDA%3D"
                    alt=""
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                </Link>
              </div>

              <div className="col-md-8">
                <p className="mb-3">NEW ARRIVALS</p>
                <h4 className="mt-4">Summer Collection</h4>
                <p>
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 bg-light p-4 mb-3">
            <div className="row p-3">
              <div className="col-md-4 ">
                <Link to={`/productListing/newArrivals`}>
                  <img
                  className='rounded'
                    src="https://plus.unsplash.com/premium_photo-1683120690591-71680296eedc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHN1bW1lciUyMHNhbGV8ZW58MHx8MHx8fDA%3D"
                    alt=""
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                </Link>
              </div>

              <div className="col-md-8">
                <p className="mb-4">NEW ARRIVALS</p>
                <h4 className="mt-4">Summer Collection</h4>
                <p>
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
