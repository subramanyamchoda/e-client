import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart!");
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }
    localStorage.setItem("orderDetails", JSON.stringify({ cart, totalPrice }));
    toast.success("Proceeding to checkout!");
    navigate("/address");
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
        <div className="flex flex-wrap justify-center -m-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="lg:w-1/3 md:w-1/2 p-4 w-full flex flex-col items-center">
                <div className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center h-full block" src={item.img} />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
                  <p className="mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center justify-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="text-center mt-6">
            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={handleBuyNow}
              className="mt-4 px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
