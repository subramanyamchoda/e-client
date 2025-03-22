import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const items = [
    { id: 1, name: "The Catalyzer", price: 16.0, img: "rice1.jpg" },
    { id: 2, name: "Shooting Stars", price: 21.15, img: "https://dummyimage.com/300x300/ccc/fff" },
    { id: 3, name: "Neptune", price: 12.0, img: "https://dummyimage.com/300x300/ccc/fff" },
    { id: 4, name: "The 400 Blows", price: 18.4, img: "https://dummyimage.com/300x300/ccc/fff" },
    { id: 5, name: "The Catalyzer", price: 16.0, img: "https://dummyimage.com/300x300/ccc/fff" },
    { id: 6, name: "Shooting Stars", price: 21.15, img: "https://dummyimage.com/300x300/ccc/fff" },
    { id: 7, name: "Neptune", price: 12.0, img: "https://dummyimage.com/300x300/ccc/fff" },
    { id: 8, name: "The 400 Blows", price: 18.4, img: "https://dummyimage.com/300x300/ccc/fff" },
  ];

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <section className="text-gray-600 body-font min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-5 py-3 max-w-screen-xl">
        <h1 className="text-4xl font-bold text-gray-900 text-center  mb-3">Our Shop Items</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-5 flex flex-col items-center">
              <img alt="Product" className="w-85 h-85 object-cover rounded-lg" src={item.img} />
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-gray-900">{item.name} - 25Kg</h2>
                <p className="mt-2 text-lg text-gray-700">${item.price.toFixed(2)}</p>
                <p className="mt-2 text-sm text-gray-500">High-quality product with the best pricing.</p>
                
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
