import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";
import { toast } from "react-toastify";
// import { useRef } from "react";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    logoutHandler,
    setWishlist,
    setCartItems,
    formMode,
    setFormMode,
    formData,
    setFormData,
  } = useProduct();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetFrom = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const tokenValid = isTokenValid();
    if (tokenValid) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setIsLoggedIn(true);
        const user = JSON.parse(savedUser);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          password: "",
        });
      }
    }
  }, []);

  const userDetails = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (formMode === "signup" && (!formData.firstName || !formData.lastName))
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const endpoint = formMode === "login" ? "verify" : "";
      const url = `${import.meta.env.VITE_SERVER_URL}/userProfile/${endpoint}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...(formMode === "signup"
            ? {
                firstName: formData.firstName,
                lastName: formData.lastName,
              }
            : {}),
        }),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        toast.success(result.message);
        setIsLoggedIn(true);
        setFormData({
          firstName: result.user.firstName || "",
          lastName: result.user.lastName || "",
          email: result.user.email || "",
          password: "",
        });
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("User data not found.");
    } finally {
      resetFrom();
    }
  };

  return (
    <>
      <Header />
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh", background: "#f8f9fa" }}
      >
        {isLoggedIn ? (
          <div
            className="card p-4 shadow-lg mx-auto "
            style={{
              maxWidth: "450px",
              width: "100%",
              borderRadius: "1.25rem",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div className="mb-3 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10551/10551812.png"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  border: "5px solid #dee2e6",
                }}
                className="rounded-circle img-fluid"
                alt="Profile Image"
              />
            </div>
            <h3 className="text-center py-2">Welcome, {formData.firstName}</h3>
            <p className="text-center text-muted mb-4">
              Here's your profile info:
            </p>
            <ul className="list-group list-group-flush">
              <li className="mb-1 list-group-item">
                <span>First Name:</span> {formData.firstName}
              </li>
              <li className="mb-1 list-group-item">
                <span>Last Name:</span> {formData.lastName}
              </li>
              <li className="mb-1 list-group-item">
                <span>Email:</span> {formData.email}
              </li>
            </ul>
            <button
              onClick={logoutHandler}
              className="btn btn-danger mt-4 w-100  rounded-pill fw-semibold"
            >
              <i className="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </div>
        ) : (
          <div
            className="card p-4 shadow-sm w-100"
            style={{
              maxWidth: "500px",
              borderRadius: "1.25rem",
              background: "#ffffff",
            }}
          >
            <h3 className="mb-4 fw-bold text-center text-primary">
              {formMode === "login" ? "Login" : "Sign Up"}
            </h3>

            <form className="form" onSubmit={userDetails}>
              {formMode === "signup" && (
                <div>
                  <label htmlFor="firstName" className="form-label fw-semibold">
                    First Name:
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your First Name"
                    className="mb-2 form-control rounded-pill px-3"
                  />
                  <br />

                  <label htmlFor="lastName" className="form-label fw-semibold">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    type="text"
                    placeholder="Enter your Last Name"
                    onChange={handleChange}
                    className="mb-2 form-control rounded-pill px-3"
                  />
                  <br />
                </div>
              )}
              <div>
                <label htmlFor="email" className="form-label fw-semibold">
                  Enter your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  placeholder="Enter your Email"
                  onChange={handleChange}
                  className=" mb-2 form-control rounded-pill px-3"
                />
                <br />

                <label htmlFor="password" className="form-label fw-semibold">
                  Enter your Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  placeholder="Enter your Password"
                  onChange={handleChange}
                  className=" mb-3 form-control rounded-pill px-3"
                />
                <div className="mb-3 d-flex form-check justify-content-start align-items-center gap-2 mx-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="togglePassword"
                    checked={showPassword}
                    onChange={handleToggle}
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                      accentColor: "#198754",
                    }}
                  />
                  <label htmlFor="togglePassword" className="form-label mb-0">
                    {showPassword ? "Hide Password" : "Show Password"}
                  </label>
                </div>

                {/* <label htmlFor="email" className='form-label fw-semibold'>Enter your Email</label>
              <input id="email" name='email' type="email" value={formData.email} placeholder="Enter your Email" onChange={handleChange} className=" mb-2 form-control rounded-pill px-3" /><br/>

              <label htmlFor="password" className='form-label fw-semibold'>Enter your Password</label>
              <input id="password" name='password' type="password" value={formData.password} placeholder="Enter your Password" onChange={handleChange} className=" mb-3 form-control rounded-pill px-3" /><br/> */}
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success d-grid rounded-pill w-50"
                >
                  {formMode === "login" ? "Sign In" : "Sign Up"}
                </button>
              </div>

              <div className="text-center mt-4 d-flex justify-content-center gap-2">
                <p className="mb-0">
                  {formMode === "login" ? "Not a member?" : "Already a member?"}
                </p>
                <button
                  onClick={() =>
                    setFormMode(() =>
                      formMode === "login" ? "signup" : "login"
                    )
                  }
                  className="btn btn-outline-primary px-4 py-1"
                >
                  {formMode === "login" ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
            {/* </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
