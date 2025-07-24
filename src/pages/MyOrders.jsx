import { useState } from "react";
import Header from "../components/Header";
import { useProduct } from "../contexts/ProductContext";

const MyOrders = () => {
  const { orderedList, setOrderedList } = useProduct();

  console.log(orderedList)

  return (
    <>
      <Header />
      <main className="mt-5 py-5">
        <p className="fs-3 text-center">My Orders</p>
        <div>
          {orderedList.length ? (
            <>
              <div className=""></div>
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
