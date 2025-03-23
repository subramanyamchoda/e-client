import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "./data";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${api}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <section className="text-gray-600 body-font min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-5 py-3 max-w-screen-xl">
        <h3 className="text-4xl text-red-600 text-center animate-bounce mb-2">Free Home Delivery (Ongole)</h3>
        <h2 className="text-2xl font-bold mb-4 text-center">(These items are delivered only to people near Ongole.)</h2>
        {/* <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">Our Shop Items</h1> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-5 flex flex-col items-center">
              <img
                src={`${api}/uploads/${product.image}`}
                alt={product.name}
                className="w-80 h-80 object-cover rounded-lg"
                onError={(e) => (e.target.src = "/placeholder-image.png")}
              />
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-gray-900">{product.name} - 25Kg</h2>
                <p className="mt-2 text-lg text-gray-700">₹{product.price.toFixed(2)}</p>
                <p className="mt-2 text-sm text-gray-500">{product.description}</p>

                <button
                  onClick={() => addToCart(product)}
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
