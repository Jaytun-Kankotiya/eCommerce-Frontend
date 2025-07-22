import { useContext, useState, createContext, useEffect } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState({});
  const [ratingFilter, setRatingFilter] = useState();
  const [priceFilter, setPriceFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formMode, setFormMode] = useState("login");
  const [userToken, setUserToken] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressData] = useState({
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

  const clearFormFields = () => {
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
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    const fetchUserData = async () => {
      if (savedUser && token) {
        setIsLoggedIn(true);
        const user = JSON.parse(savedUser);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          password: "",
        });
        try {
          const [cartRes, wishlistRes] = await Promise.all([
            fetch("http://localhost:3000/cartItems", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:3000/wishlist", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          const cartProducts = await cartRes.json();
          const wishlistProducts = await wishlistRes.json();
          setCartItems(cartProducts.data?.map((item) => item.id) || []);
          setWishlist(wishlistProducts.data?.map((item) => item.id) || []);
        } catch (error) {
          console.error("Failed to fetch cart or wishlist items:", error);
          setCartItems([]);
          setWishlist([]);
        }
      } else {
        setIsLoggedIn(false);
        setCartItems([]);
        setWishlist([]);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }
    };
    fetchUserData();
  }, [isLoggedIn]);

  const decreaseQuantity = (productId) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const increaseQuantity = (productId) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const sizeHandler = (productId, sizeOption) => {
    setSize((prev) => ({
      ...prev,
      [productId]: sizeOption,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/userProfile", {
          method: "GET",
          headers: {
            Authorization: userToken,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setWishlist(result.wishlist.map((item) => item.id));
          setCartItems(result.cartItems.map((item) => item.id));
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    if (isLoggedIn && userToken) fetchUserData();
  }, [isLoggedIn, userToken]);

  let searchFilter = items || [];

  if (search?.trim()) {
    const searchLower = search.toLowerCase();
    searchFilter = searchFilter.filter((product) =>
      product.name.toLowerCase().includes(searchLower)
    );
  }

  const addAndRemoveFromCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to use wishlist.");
      return;
    }
    const isAlreadyInCart = cartItems.includes(product.id);
    try {
      if (isAlreadyInCart) {
        await fetch(`http://localhost:3000/cartItems/${product.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems((prev) => prev.filter((id) => id !== product.id));
        toast.info("Item removed from cart");
      } else {
        const res = await fetch("http://localhost:3000/cartItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: product.id,
            name: product.name,
            price: product.price,
            imageLink: product.imageLink,
            category: product.category,
            rating: product.rating,
            descriptions: product.descriptions,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          console.log("Server error message:", err.error);
          throw new Error("Failed to add item to cart");
        }
        setCartItems((prev) => [...prev, product.id]);
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.log("Error sending cart request.");
    }
  };

  const wishListAddHandler = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to use wishlist.");
      return;
    }
    const isWishlisted = wishlist.includes(product.id);
    try {
      if (isWishlisted) {
        const res = await fetch(
          `http://localhost:3000/wishlist/${product.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to remove item from wishlist.");
        setWishlist((prev) => prev.filter((id) => id !== product.id));
        toast.info("Item removed from wishlist");
      } else {
        const res = await fetch("http://localhost:3000/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: product.id,
            name: product.name,
            price: product.price,
            imageLink: product.imageLink,
            category: product.category,
            rating: product.rating,
            descriptions: product.descriptions,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          console.log("Server error message:", err.error);
          throw new Error("Failed to add item to wishlist");
        }
        setWishlist((prev) => [...prev, product.id]);
        toast.success("Item added to wishlist");
      }
    } catch (error) {
      console.log("Error sending wishlist request.", error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    setWishlist([]);
    setCartItems([]);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const totalCartValue = cartData.reduce(
    (acc, item) => acc + item.price * (quantity[item.id] || 1),
    0
  );
  const deliveryFee = (5 * totalCartValue) / 100;
  const delivery = totalCartValue > 2999 ? "Free Delivery" : `₹${deliveryFee}`;
  const discount = totalCartValue;

  const location = useLocation();
  const isAddressPage = location.pathname === "/address";

  const addressFormHandler = async (address) => {
    try {
      const token = localStorage.getItem("token");
      // const isAlreadyExist = addressList.some((item) => item.email === address.email)
      // if(!isAlreadyExist){
      const response = await fetch("http://localhost:3000/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: address.firstName,
          lastName: address.lastName || "",
          email: address.email,
          phoneNumber: address.phoneNumber,
          addressLine1: address.addressLine1 || "",
          addressLine2: address.addressLine2,
          postalcode: address.postalcode,
          city: address.city,
          province: address.province,
          country: address.country,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setAddressList((prev) => [...prev, data]);
        toast.success("New Address added.");
      } else {
        toast.error("Failed to add address.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleCheckboxChange = async (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in.");
      return;
    }
    const isChecked = e.target.checked;

    setAddressData((prev) => ({
      ...prev,
      saveAddress: isChecked,
    }));

    if (isChecked) {
      const newAdd = await addressFormHandler(addressData);
      if(newAdd){
        setAddressList((prev) => [...prev, newAdd])
      }
      
    }
  };

  const handleSaveAddress = async () => {
    const newAddress = await addressFormHandler(addressData);
    if (newAddress) {
      setAddressList((prev) => [...prev, newAddress]);
      toast.success("Address saved successfully");
      clearFormFields()
    }
  };


  const addressFormData = () => {
    return (
      <>
        <div className="">
          <form className="p-4">
            <p className="fs-3">Enter your Name and address:</p>

            <input
              type="text"
              required
              name="firstName"
              placeholder="First Name"
              id=""
              value={addressData.firstName}
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  [e.target.name]: e.target.value,
                })
              }
              className="form-control mt-4"
              style={{ height: "50px" }}
            />
            <br />

            <input
              type="text"
              name="lastName"
              id=""
              value={addressData.lastName}
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  [e.target.name]: e.target.value,
                })
              }
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
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    [e.target.name]: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    [e.target.name]: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    [e.target.name]: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Country"
                className="form-control"
                style={{ height: "50px" }}
              />
              <br />
            </div>
            <br />

            <input
              type="tel"
              name="phoneNumber"
              value={addressData.phoneNumber}
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  [e.target.name]: e.target.value,
                })
              }
              className="form-control"
              placeholder="Phone Number"
              style={{ height: "50px" }}
            />
          </form>
        </div>
      </>
    );
  };

  return (
    <>
      <ProductContext.Provider
        value={{
          wishlist,
          setWishlist,
          cartItems,
          setCartItems,
          quantity,
          setQuantity,
          decreaseQuantity,
          increaseQuantity,
          addAndRemoveFromCart,
          size,
          setSize,
          logoutHandler,
          ratingFilter,
          setRatingFilter,
          priceFilter,
          setPriceFilter,
          category,
          setCategory,
          sizeHandler,
          handleCheckboxChange,
          search,
          setSearch,
          searchFilter,
          loading,
          setLoading,
          isLoggedIn,
          setIsLoggedIn,
          wishListAddHandler,
          formMode,
          setFormMode,
          formData,
          setFormData,
          categoryProducts,
          setCategoryProducts,
          cartData,
          setCartData,
          discount,
          delivery,
          deliveryFee,
          totalCartValue,
          addressData,
          setAddressData,
          addressFormHandler,
          addressList,
          setAddressList,
          addressFormData,
          handleSaveAddress,
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
};

export { ProductProvider };
