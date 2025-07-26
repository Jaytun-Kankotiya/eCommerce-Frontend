import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const {
    orderedList,
    setOrderedList,
    // totalCartValue,
    addressData,
    setAddressData,
    loading,
    setLoading,
    totalOrderValue,
  } = useProduct();



  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch order details.");
        }
        const result = await response.json();
        setOrderedList(result.data);
        // console.log(result.data);
        setAddressData(false);
      } catch (error) {
        console.log("Error fetching orders data.");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


  return (
    <>
      <Header />
      <main className="mt-5 py-4">
        <p className="fs-3 text-center py-2">My Orders</p>
        <div className="container">
          {orderedList.length ? (
            orderedList.map((order) => (
              <div className="card mb-4" key={order._id}>
                <div className="card-header d-flex justify-content-between flex-wrap gap-3 px-4">
                  <div className="mt-2 mx-4">
                    <p className="mb-1">
                      <strong>Order ID:</strong> 
                    </p>
                    <p>#{order._id}</p>

                  </div>

                  <div className="mt-2">
                    <p className="mb-1">
                      <strong>Total Value:</strong>
                    </p>
                    <p>₹{order.totalOrderValue}</p>
                  </div>

                  <div className="mt-2 me-5">
                    <p className="mb-1">
                      <strong>Ship To:</strong>
                    </p>
                    <p className="mb-0">
                      {order.firstName} {order.lastName}
                    </p>
                  </div>
                </div>

                <div className="card-body px-4">
                  <div className="row g-4 px-3 mt-1">
                    <div className="col-lg-6">
                      {order.cartData.map((item, index) => (
                        <div className="d-flex mb-4" key={index}>
                          <Link to={`/productDetails/${item.id}`}>
                          <img
                            src={item.imageLink}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              marginRight: "25px",
                            }}
                          />
                          </Link>
                          <div className="mt-1">
                            <h6>{item.name}</h6>
                            <p className="mb-1 text-muted">
                              Price: ₹{item.price}
                            </p>
                            <p className="mb-1 text-muted">
                              Quantity: {item.quantity || 1}
                            </p>
                            {/* {item.size && (
                              <p className="mb-1 text-muted">
                                Size: {item.size}
                              </p>
                            )} */}
                            <Link to={`/productDetails/${item.id}`} className="btn btn-primary mt-2">Buy it again</Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="col-lg-4">
                      <p className="fs-6 fw-semibold mb-1">Delivered To:</p>
                      <p className="mb-1">
                        {order.firstName} {order.lastName}
                      </p>
                      <p className="mb-1">{order.addressLine1}</p>
                      {order.addressLine2 && (
                        <p className="mb-1">{order.addressLine2}</p>
                      )}
                      <p className="mb-1">
                        {order.city}, {order.postalcode}
                      </p>
                      <p className="mb-0">
                        {order.province}, {order.country}
                      </p>

                      <div className="mt-4 d-grid gap-2">
                      <button className="btn btn-outline-success w-50 w-lg-auto mt-5">Write a Product review</button>
                      <button className="btn btn-outline-warning w-50 w-lg-auto mt-2">Get Product Support</button>
                      </div>
                    </div>

                    <div className="col-lg-2">
                      <p className="fs-6 fw-semibold mb-1">Payment Method:</p>
                      <p>{order.selectedMethod}</p>

                      <p className="fs-6 fw-semibold mb-1">Order Placed On:</p>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h3 className="mt-5">Your Order List is Empty</h3>
              <p className="mt-2 text-muted">Add products you love to buy</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MyOrders;
