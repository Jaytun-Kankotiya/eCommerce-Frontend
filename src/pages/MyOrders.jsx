import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";

const MyOrders = () => {
  const {
    orderedList,
    setOrderedList,
    totalCartValue,
    addressData,
    setAddressData,
    loading,
    setLoading,
  } = useProduct();

  console.log(orderedList);

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
        console.log(result.data)
        setAddressData(false)
      } catch (error) {
        console.log("Error fetching orders data.")
        setLoading(false)
      }
    }
    fetchOrders()
  }, []);

  console.log(orderedList)

  return (
    <>
      <Header />
      <main className="mt-5 py-4">
        <p className="fs-3 text-center">My Orders</p>
        <div className="container">
          {orderedList.length ? (
            <>
              {orderedList.map((order) => (
                <>
                  <div className="card" key={order.id}>
                    <div className="card-header d-flex align-items-between">
                      <div className="d-flex flexx-column">
                        <p>Order Placed</p>
                        <p>{}</p>
                      </div>

                      <div>
                        <p>Total Value</p>
                        <p>${totalCartValue}</p>
                      </div>

                      <div>
                        <p>ship To</p><p>{addressData.name}</p>
                      </div>
                    </div>
                    <div className="card-body">
                        <div>
                            {}
                        </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <div className="text-center py-5">
                <h3 className="mt-5">Your Order list is Empty</h3>
                <p className="mt-2 text-muted">Add products you love to buy</p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default MyOrders;
