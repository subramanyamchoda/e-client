import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "./data";
const socket = io("http://localhost:5000");

const Details = () => {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
  });

  const [orderDetails, setOrderDetails] = useState({ cart: [], totalPrice: 0 });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("orderDetails")) || { cart: [], totalPrice: 0 };
    setOrderDetails(storedOrder);

    const storedAddress = JSON.parse(localStorage.getItem("address"));
    if (storedAddress) {
      setAddress(storedAddress);
      setIsAddressSaved(true);
    }

    socket.on("orderSuccess", (data) => {
      toast.success(data.message);
      navigate("/order");
    });

    return () => socket.off("orderSuccess");
  }, [navigate]);

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("address", JSON.stringify(address));
    setIsAddressSaved(true);

    const orderData = { ...address, cart: orderDetails.cart, totalPrice: orderDetails.totalPrice };

    try {
      const response = await fetch(`${api}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        navigate("/order");
      } else {
        const data = await response.json();
        toast.error(`Order failed: ${data.message}`);
      }
    } catch (error) {
      toast.error("Network error! Please try again.");
      console.error("Error submitting order:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container-fluid px-5 py-24 mx-auto max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Your Order</h2>
            {orderDetails.cart.map((item) => (
              <div key={item.id} className="flex items-center border-b py-2">
                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded mr-3" />
                <div>
                  <p className="text-gray-800 font-medium">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <h2 className="text-lg font-bold mt-4">Total: ${orderDetails.totalPrice.toFixed(2)}</h2>
          </div>

          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Enter Your Address</h2>
            <form onSubmit={handleSubmit}>
              {["name", "phone", "email", "street", "city"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={address[field]}
                  onChange={handleChange}
                  required
                  disabled={isAddressSaved}
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
              ))}
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                Proceed to Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
