import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
    // cartData,
    // setCartData,
    cartItems,
    quantity,
    discount,
    delivery,
    deliveryFee,
    totalCartValue,
    addressData,
    setAddressData,
    addressFormHandler,
    addressFormData,
    handleCheckboxChange,
    placeOrderHandler,
    selectedMethod,
    setSelectedMethod,
    orderPlaceHandler,
    totalOrderValue
  } = useProduct();

  const paymentMethods = [
    "Credit or Debit Card",
    "PayPal",
    "Apple Pay",
    "Cryptocurrencies",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   const navigate = useNavigate()

  // console.log(totalOrderValue)

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container py-3 mt-3 ">
          <>
            {cartItems.length > 0 ? (
              <>
                <h2 className="mt-5 py-3 text-center">Checkout</h2>
                <div className="row">
                  <div className="col-md-6 ms-1 mx-4">
                    {addressFormData()}
                    <div className="d-flex gap-3 mx-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        // name="saveAddress"
                        checked={addressData.saveAddress || false}
                        onChange={handleCheckboxChange}
                        style={{ height: "20px", width: "20px" }}
                      />
                      <label className="form-check-label" id="saveAddress">
                        Save this address to my profile
                      </label>
                    </div>
                    <br />
                    <hr />

                    <div className="mx-4">
                      <p className="fs-3">Payment</p>

                      <label className="fs-5 mt-3">Have a promo code?</label>
                      <div className="d-flex align-items-center mt-2 gap-3">
                        <input
                          type="text"
                          placeholder="Promo"
                          className="form-control"
                          style={{ width: "300px", height: "50px" }}
                        />
                        <button className="btn btn-success rounded-pill">
                          Apply
                        </button>
                      </div>
                      <br />
                      <br />
                    </div>

                    <div className="mx-4 mb-4">
                      <p className="fs-5 mb-3">How would you like to pay?</p>

                      <div className="d-flex flex-column gap-3">
                        {paymentMethods.map((method, index) => (
                          <div key={index}>
                            <label
                              key={index}
                              id={`payment-${index}`}
                              onClick={() => setSelectedMethod(method)}
                              className={`p-3 border rounded d-flex align-items-center gap-3${
                                selectedMethod === method
                                  ? "border border-1 border-primary bg-light shadow-sm"
                                  : "border-secondary"
                              }`}
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                maxWidth: "320px",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <input
                                type="radio"
                                name="payment"
                                id={`payment-${index}`}
                                value={method}
                                checked={selectedMethod === method}
                                onChange={() => setSelectedMethod(method)}
                                className="d-none form-check-input"
                                style={{ pointerEvents: "none" }}
                              />
                              <span className="fw-medium">{method}</span>
                            </label>
                          </div>
                        ))}
                        {selectedMethod && (
                          <p>Selected Payment: {selectedMethod}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-4 ms-5 bg-white shadow-sm rounded py-4 mt-4"
                    style={{
                      position: "sticky",
                      top: "100px",
                      alignSelf: "start",
                    }}
                  >
                    <div className="px-2">
                      <p className="fs-4 fw-normal">Order Summary</p>
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
                      <div className="d-flex justify-content-between">
                        <p>Taxes (GST/HST)</p>
                        <p>₹{totalCartValue * 0.13}</p>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <h5>TOTAL AMOUNT</h5>
                        <h5>₹{totalOrderValue}</h5>
                      </div>
                      <hr />
                      <p className="text-center">
                        You will save ₹{discount} on this order
                      </p>
                      <button
                        onClick={placeOrderHandler}
                        type="button"
                        className="btn btn-primary w-100"
                      >
                        Place Order
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

export default Checkout;
