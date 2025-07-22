import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";
import { toast } from "react-toastify";

const Address = () => {
  const {
    addressFormData,
    addressData,
    setAddressData,
    loading,
    setLoading,
    addressList,
    setAddressList,
    handleSubmit,
    addressFormHandler,
    fetchAddressData,
    handleSaveAddress,
  } = useProduct();

  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    const fetchAddressData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch the address data.");
        }
        const result = await response.json();
        setAddressList(result.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching address data.", error);
        setLoading(false);
      }
    };
    fetchAddressData();
  }, []);

  useEffect(() => {
    setAddressData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      postalcode: "",
      city: "",
      province: "",
      country: "",
      saveAddress: false,
    });
  }, []);

  const removeAddress = async (address) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(
        `http://localhost:3000/address/${address._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if(!response.ok){
        throw new Error("Failed to delete an adddress")
      }
      setAddressList((prev) => prev.filter((item) => item._id !== address._id))
      toast.success("Address removed successfully.")
    } catch (error) {
        toast.error("Error deleting saved address")
    }
  };

  const editAddress = async (adddress) => {
    setAddressData(adddress)
    setShowAddressForm(true)
  }

  return (
    <>
      <Header />
      <div className="container mt-5 py-5">
        <div className="d-flex align-items-center justify-content-between">
          <p className="fs-3">Saved Address</p>
          <button
            onClick={() => setShowAddressForm((prev) => !prev)}
            className="btn btn-primary"
          >
            {showAddressForm ? "Cancel" : "Add New Address"}
          </button>
        </div>
        <hr />

        {showAddressForm && addressFormData()}

        {showAddressForm && (
          <div className="text-center">
            <button
              onClick={handleSaveAddress}
              className="btn btn-primary mb-4"
            >
              {addressData._id ? "Update Address" : "Add Address"}
            </button>
          </div>
        )}

        <div>
          {addressList.length > 0 ? (
            <div className="row">
              {addressList.map((item, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <div
                    className="card card  h-100 mb-2"
                    
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between ">
                        <div>
                          <h5 className="card-title mb-3">
                            {item.firstName} {item.lastName}
                          </h5>
                          <p className="mb-1">
                            <strong>Email:</strong> {item.email}
                          </p>
                          <p className="mb-1">
                            <strong>Phone Number:</strong> {item.phoneNumber}
                          </p>
                          <p className="mb-1">
                            <strong>Address:</strong> {item.addressLine1}{" "}
                            {item.addressLine2}, {item.postalcode}
                          </p>
                          <p className="mb-1">
                            <strong>City:</strong> {item.city}
                          </p>
                          <p className="mb-1">
                            <strong>Province:</strong> {item.province}
                          </p>
                          <p className="mb-1">
                            <strong>Country:</strong> {item.country}
                          </p>
                        </div>

                        <div className="d-flex flex-column gap-3">
                          <button onClick={() => editAddress(item)} className="btn btn-outline-primary">
                            Edit
                          </button>
                          <button onClick={() => removeAddress(item)} className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="fs-5 text-center mt-3">No Saved addresses yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Address;
