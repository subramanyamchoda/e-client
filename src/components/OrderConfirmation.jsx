import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./data"; // Import the API URL

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
        <h1 className="text-2xl font-bold mb-4 text-green-600">🎉 Order Placed Successfully! 🎉</h1>
        <p className="text-gray-700">Your order will be delivered within <span className="font-bold">1 day</span>.</p>
        <p className="text-gray-700">Dispatched from <span className="font-bold">kothapatnam bustand</span>.</p>

        {/* Order Summary */}
        <div className="mt-6 text-left">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
          <div className="divide-y divide-gray-300 mt-2">
            {orderDetails.cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <img
                    src={`${api}/uploads/${item.image}`} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                    onError={(e) => (e.target.src = "/placeholder-image.png")}
                  />
                  <div className="ml-3">
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-gray-900 font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <h2 className="text-lg font-bold mt-4 text-gray-900">Total: ₹{orderDetails.totalPrice.toFixed(2)}</h2>
        </div>

        {/* Order GIF */}
        <div className="mt-6">
          <img 
            src="https://cdn.dribbble.com/users/185136/screenshots/2113987/media/152e2e8a09a1b6cb5c27e31ec640babd.gif" 
            alt="Order on the way" 
            className="w-40 mx-auto"
          />
        </div>

        {showMessage && <p className="text-green-500 mt-4 font-semibold text-lg">Your order is on the way! 🚚</p>}
      </div>
    </section>
  );
};

export default OrderConfirmation;
