import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Checkout = () => {
  const {
    cartData,
    setCartData,
    cartItems,
    quantity,
    discount,
    delivery,
    deliveryFee,
    totalCartValue,
    addressData, setAddressData,
    addressFormHandler
  } = useProduct();

  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    "Credit or Debit Card",
    "PayPal",
    "Apple Pay",
    "Cryptocurrencies",
  ];

//   console.log(cartData);

  const handleSubmit = (e) => {
    e.preventDefault()

    if(addressData.saveAddress){
        addressFormHandler(addressData)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  console.log(addressData)

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container py-3 mt-3">
          <>
            {cartItems.length > 0 ? (
              <>
                <h2 className="mt-5 py-3 text-center">Checkout</h2>
                <div className="row">
                  <div className="col-md-6 ms-1 mx-4">
                    <form className="p-4" onSubmit={handleSubmit}>
                      <p className="fs-3">Enter your Name and address:</p>

                      <input
                        type="text"
                        required
                        name="firstName"
                        placeholder="First Name"
                        id=""
                        value={addressData.firstName}
                        onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                        className="form-control mt-4"
                        style={{ height: "50px" }}
                      />
                      <br />

                      <input
                        type="text"
                        name="lastName"
                        id=""
                        value={addressData.lastName}
                        onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                        placeholder="Last Name"
                        className="form-control"
                        style={{ height: "50px" }}
                      />
                      <br />

                      <input
                        type="text"
                        name="email"
                        required
                        id=""
                        value={addressData.email}
                        onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                        placeholder="Email "
                        className="form-control"
                        style={{ height: "50px" }}
                      />
                      <br />

                      <input
                        type="text"
                        name="addressLine1"
                        id=""
                        value={addressData.addressLine1}
                        onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                        placeholder="Address Line 1"
                        required
                        className="form-control"
                        style={{ height: "50px" }}
                      />
                      <br />

                      <input
                        type="text"
                        name="addressLine2"
                        id=""
                        value={addressData.addressLine2}
                        onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                        placeholder="Address Line 2"
                        className="form-control"
                        style={{ height: "50px" }}
                      />
                      <br /> 

                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="text"
                          name="postalcode"
                          required
                          id=""
                          value={addressData.postalcode}
                          onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                          placeholder="Postal Code"
                          className="form-control"
                          style={{ height: "50px" }}
                        />
                        <br />

                        <input
                          type="text"
                          name="city"
                          id=""
                          value={addressData.city}
                          onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                          placeholder="City"
                          className="form-control"
                          style={{ height: "50px" }}
                        />
                        <br />
                      </div>
                      <br />

                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="text"
                          name="province"
                          id=""
                          value={addressData.province}
                          onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                          placeholder="State/Province"
                          className="form-control"
                          style={{ height: "50px" }}
                        />
                        <br />

                        <input
                          type="text"
                          name="country"
                          id=""
                          value={addressData.country}
                          onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                          placeholder="Country"
                          className="form-control"
                          style={{ height: "50px" }}
                        />
                        <br />
                      </div>
                      <br />

                      <input
                        type="number"
                        name="phoneNumber"
                        value={addressData.phoneNumber}
                        onChange={(e) => setAddressData({...addressData, [e.target.name]: e.target.value})}
                        className="form-control"
                        placeholder="Phone Number"
                        style={{ height: "50px" }}
                      />
                      <br />

                      <div className="">
                        <div className="d-flex gap-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            // name="saveAddress" 
                            checked={addressData.saveAddress}
                            onChange={(e) => setAddressData({...addressData, saveAddress: e.target.checked})}
                            style={{ height: "20px", width: "20px" }}
                          />
                          <label className="form-check-label" id="saveAddress">
                            Save this address to my profile
                          </label>
                        </div>
                        <br />

                        {/* <div className="d-flex gap-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            style={{ height: "20px", width: "20px" }}
                          />
                          <label
                            className="form-check-label"
                            id="preferredAddress"
                          >
                            {" "}
                            Make this my preferred address
                          </label>
                        </div> */}
                      </div>
                    </form>
                      <hr />

                      <div>
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

                      <div>
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
                              style={{ cursor: 'pointer', width: "100%", maxWidth: "320px", transition: "all 0.3s ease" }}
                            >
                              <input
                                type="radio"
                                name="payment"
                                id={`payment-${index}`}
                                value={method}
                                checked={selectedMethod === method}
                                onChange={() => setSelectedMethod(method)}
                                className="d-none form-check-input"
                                style={{ pointerEvents: 'none' }}
                              />
                              <span className="fw-medium">{method}</span>
                            </label>
                            </div>
                          ))}
                          {selectedMethod && <p>Selected Payment: {selectedMethod}</p>}
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
                        <h5>
                          ₹
                          {totalCartValue + (totalCartValue * 0.13) +
                            (delivery === "Free Delivery" ? 0 : deliveryFee)}
                        </h5>
                      </div>
                      <hr />
                      <p className="text-center">
                        You will save ₹{discount} on this order
                      </p>
                      <Link
                        to={"/orders"}
                        type="button"
                        className="btn btn-primary w-100"
                      >
                        Place Order
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

export default Checkout;
