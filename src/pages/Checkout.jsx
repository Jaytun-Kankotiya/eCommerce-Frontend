import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
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
    totalOrderValue,
    defaultAddress,
    setDefaultAddress,
    addressList,
    setAddressList,
  } = useProduct();

  const [useNewAddress, setUseNewAddress] = useState(false);
  const [addressShow, setAddressShow] = useState(null)

  // useEffect(() => {
  //   if(!defaultAddress && addressList.length > 0){
  //     const defaultAdr = addressList.find((addr) => addr.defaultAddress)
  //     if(defaultAdr){
  //       setDefaultAddress(defaultAdr._id)
  //     }
  //   }
  // }, [addressList])

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   const initializeDefaultAddress = async () => {
  //     if(addressList.length === 0) return

  //     const defaultAdr = addressList.find((addr) => addr.defaultAddress)
  //     if(!defaultAdr) return
      
  //     setDefaultAddress(defaultAdr._id)

  //     try {
  //       const response = await fetch(`http://localhost:3000/address/${defaultAdr._id}`, {
  //       headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     })
  //     const result = await response.json()
  //     if(result.data){
  //       setAddressData(result.data)
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch default address", error);
  //   }
  //   }
  //   initializeDefaultAddress()
  // }, [addressList])

  const paymentMethods = [
    "Credit or Debit Card",
    "PayPal",
    "Apple Pay",
    "Cryptocurrencies",
  ]; 

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      const token = localStorage.getItem("token")
    try {
        const refreshed = await fetch("http://localhost:3000/address/default", {
        headers: {
        Authorization: `Bearer ${token}`,
      },
      })
      const result = await refreshed.json()
      
      if(result.data){
        console.log("Result:", result.data)
        setAddressShow(result.data)
        setDefaultAddress(result.data._id)
      }
    } catch (error) {
      console.error("Failed to fetch default address", error);
    }
    }
    fetchDefaultAddress()
    window.scrollTo(0, 0);
  }, []);

  const showDefaultAddress =  addressShow;

  console.log(showDefaultAddress);

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
                    <div className="row">
                      {
                        !useNewAddress && showDefaultAddress && (
                          <div
                            className={`card border-primary border-3 shadow-sm p-3 mb-4 mx-4`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              toast.info(
                                "This address will be used for delivery"
                              )
                            }
                          >
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between ">
                              <div className="col-md-6">
                                <h5 className="card-title mb-3">
                                  {showDefaultAddress.firstName}{" "}
                                  {showDefaultAddress.lastName}
                                </h5>
                                <p className="mb-1">
                                  <strong>Email:</strong>{" "}
                                  {showDefaultAddress.email}
                                </p>
                                <p className="mb-1">
                                  <strong>Phone Number:</strong>{" "}
                                  {showDefaultAddress.phoneNumber}
                                </p>
                                <p className="mb-1">
                                  <strong>Address:</strong>{" "}
                                  {showDefaultAddress.addressLine1}{" "}
                                  {showDefaultAddress.addressLine2},{" "}
                                  {showDefaultAddress.postalcode}
                                </p>
                                <p className="mb-1">
                                  <strong>City:</strong>{" "}
                                  {showDefaultAddress.city}
                                </p>
                                <p className="mb-1">
                                  <strong>Province:</strong>{" "}
                                  {showDefaultAddress.province}
                                </p>
                                <p className="mb-1">
                                  <strong>Country:</strong>{" "}
                                  {showDefaultAddress.country}
                                </p>
                              </div>

                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setUseNewAddress(true);
                                    }}
                                    className="btn btn-warning"
                                  >
                                    Use a different address
                                  </button>
                                  <Link
                                    to={"/address"}
                                    onClick={() => removeAddress(item)}
                                    className="btn btn-info"
                                  >
                                    Change Address
                                  </Link>
                                </div>
                              </div>
                              
                                
                              </div>
                            </div>
                          </div>
                        )
                        //  : (
                        //   <div className="mx-4">
                        //     <p>
                        //       No default address found. Please select or add an
                        //       address.
                        //     </p>
                        //   </div>
                        // )
                      }
                    </div>

                    {useNewAddress && addressFormData()}
                    <div className="d-flex gap-3 mx-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
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
                        <p>₹{(totalCartValue * 0.13).toFixed(2)}</p>
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
