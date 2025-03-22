import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order details from localStorage
    const storedOrder = JSON.parse(localStorage.getItem("orderDetails"));

    if (!storedOrder || storedOrder.cart.length === 0) {
      navigate("/"); // Redirect to home if no order found
    } else {
      setOrderDetails(storedOrder);
      setTimeout(() => setShowMessage(true), 3000); // Show message after 3 seconds
    }
  }, [navigate]);

  if (!orderDetails) return null; // Prevent rendering if no order

  return (
    <section className="text-gray-600 body-font flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully! 🎉</h1>
        <p>Your order will be delivered within 1 day.</p>
        <p>Your order will be dispatched from Srinagar Colony 1st Line.</p>

        {/* Order Details */}
        <div className="mt-4 text-left">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          {orderDetails.cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center">
                <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded mr-2" />
                <p className="text-gray-800 font-medium">{item.name}</p>
              </div>
              <p className="text-gray-500">Qty: {item.quantity}</p>
              <p className="text-gray-800 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h2 className="text-lg font-bold mt-4">Total: ${orderDetails.totalPrice.toFixed(2)}</h2>
        </div>

        {/* Order GIF */}
        <div className="mt-4">
          <img 
            src="https://cdn.dribbble.com/users/185136/screenshots/2113987/media/152e2e8a09a1b6cb5c27e31ec640babd.gif" 
            alt="Order on the way" 
            className="w-40 mx-auto"
          />
        </div>

        {showMessage && <p className="text-green-500 mt-4 font-semibold">Your order is on the way! 🚚</p>}
      </div>
    </section>
  );
};

export default OrderConfirmation;
