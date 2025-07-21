import { useContext, useState, createContext, useEffect } from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import useFetch from '../useFetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);


const ProductProvider = ({ children }) => {
//   const useAuth = () => {
//   const token = localStorage.getItem('token')
//   return {isLoggedIn: !!token}
// }
// const {isLoggedIn} = useAuth()
  // const { data, loading, error } = useFetch(
  //   'http://localhost:3000/productListing'
  // );
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState({});
  const [ratingFilter, setRatingFilter] = useState();
  const [priceFilter, setPriceFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formMode, setFormMode] = useState("login")
  const [userToken, setUserToken] = useState(null)
  const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: ''})
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [cartData, setCartData] = useState([])
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
})


  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem('user')

    const fetchUserData = async () => {
      if(savedUser && token){
      setIsLoggedIn(true)
      const user = JSON.parse(savedUser)
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: ''
      })

      // const fetchCartItems = async () => {
      try {
        const [cartRes, wishlistRes] = await Promise.all([
          fetch('http://localhost:3000/cartItems', {
          headers: { Authorization: `Bearer ${token}` }
        }),
          fetch('http://localhost:3000/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
      })
      ])

      const cartProducts = await cartRes.json();
      const wishlistProducts = await wishlistRes.json()
      setCartItems(cartProducts.data?.map(item => item.id) || [])
      setWishlist(wishlistProducts.data?.map(item => item.id) || []);
      } catch (error) {
      console.error("Failed to fetch cart or wishlist items:", error);
      setCartItems([]);
      setWishlist([]);
      }
    }
    else{
      setIsLoggedIn(false)
      setCartItems([])
      setWishlist([])
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      })
    }
  }
    fetchUserData()
}, [isLoggedIn])


  const decreaseQuantity = (productId) => {
    setQuantity(((prev) => ({
    ...prev,
    [productId]: Math.max(1, (prev[productId] || 1) - 1)
    })))
  }

  const increaseQuantity = (productId) => {
    setQuantity((prev) => ({
    ...prev,
    [productId]: (prev[productId] || 1) + 1
  }))
  }

  const sizeHandler = (productId, sizeOption) => {
    setSize((prev) => ({
      ...prev, [productId]: sizeOption
    }))
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/userProfile',{
          method: 'GET',
          headers: {
            Authorization: userToken
          },
        })
        const result = await response.json()
        if(response.ok){
          setWishlist(result.wishlist.map((item) => item.id))
          setCartItems(result.cartItems.map((item) => item.id))
        }
      } catch (error) {
        console.log("Error fetching user data:", error)
      }
    }
    if(isLoggedIn && userToken) fetchUserData()
  }, [isLoggedIn, userToken])


  let searchFilter = items || [];

  if (search?.trim()) {
    const searchLower = search.toLowerCase();
    searchFilter = searchFilter.filter((product) =>
      product.name.toLowerCase().includes(searchLower)
    );
  }

  const addAndRemoveFromCart = async (product) => {
    const token = localStorage.getItem("token")
    if (!token) {
    toast.error("Please log in to use wishlist.");
    return;
  }
    const isAlreadyInCart = cartItems.includes(product.id)
    try {
      if(isAlreadyInCart){
        await fetch(`http://localhost:3000/cartItems/${product.id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setCartItems((prev) => prev.filter((id) => id !== product.id))
        toast.info("Item removed from cart")
      }else{
          const res = await fetch('http://localhost:3000/cartItems', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          imageLink: product.imageLink,
          category: product.category,
          rating: product.rating,
          descriptions: product.descriptions
          })
        })

          if(!res.ok) {
          const err = await res.json()
          console.log("Server error message:", err.error);
          throw new Error("Failed to add item to cart");
        }
        setCartItems((prev) => [...prev, product.id] )
        toast.success("Item added to cart")
      }
    } catch (error) {
      console.log("Error sending cart request.")
    }
  };



  const wishListAddHandler = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
    toast.error("Please log in to use wishlist.");
    return;
  }
    const isWishlisted = wishlist.includes(product.id)
    try {
      if(isWishlisted){
        const res = await fetch(`http://localhost:3000/wishlist/${product.id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if(!res.ok) throw new Error("Failed to remove item from wishlist.")
        setWishlist((prev) => prev.filter((id) => id !== (product.id)))
        toast.info("Item removed from wishlist")
      }else {
        const res = await fetch('http://localhost:3000/wishlist', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          imageLink: product.imageLink,
          category: product.category,
          rating: product.rating,
          descriptions: product.descriptions})
        })

        if(!res.ok) {
          const err = await res.json()
          console.log("Server error message:", err.error);
          throw new Error("Failed to add item to wishlist");
        }
        setWishlist((prev) => [...prev, product.id])
        toast.success("Item added to wishlist")
      }
    } catch (error) {
       console.log("Error sending wishlist request.", error)
    }
  }

  const totalCartValue = cartData.reduce(
    (acc, item) => acc + item.price * (quantity[item.id] || 1),
    0
  );
  const deliveryFee = (5 * totalCartValue) / 100;
  const delivery = totalCartValue > 2999 ? 'Free Delivery' : `₹${deliveryFee}`;
  const discount = totalCartValue 


  const addressFormHandler = async (address) => {
    try {
      const token = localStorage.getItem("token")
      const isAlreadyExist = formData.includes(address.email)
      // if(!isAlreadyExist){
        const response = await fetch("http://localhost:3000/address",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: address.firstName,
          lastName: address.lastName || '',
          email: address.email,
          phoneNumber: address.phoneNumber,
          addressLine1: address.addressLine1 || '',
          addressLine2: address.addressLine2,
          postalcode: address.postalcode,
          city: address.city,
          province: address.province,
          country: address.country,
        })
      })
        if(response.ok){
          toast.success("New Address added.")
        }
    //   }else {
    //   toast.warn("This address already exists.");
    // }
    } catch (error) {
      console.log("Error addind new address.", error)
    }
  }


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
          ratingFilter,
          setRatingFilter,
          priceFilter,
          setPriceFilter,
          category,
          setCategory,
          sizeHandler,
          search,
          setSearch,
          searchFilter,
          loading, setLoading,
          isLoggedIn, setIsLoggedIn,
          wishListAddHandler,
          formMode, setFormMode,
          formData, setFormData,
          categoryProducts, setCategoryProducts,
          cartData, setCartData,
          discount,
          delivery,
          deliveryFee,
          totalCartValue,
          addressData, setAddressData,
          addressFormHandler
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
};

export {ProductProvider};
