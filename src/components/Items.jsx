import React, { useState, useEffect } from "react";
import axios from "axios";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://riceshop-pgp7.onrender.com/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingProduct) {
        await axios.put(`https://riceshop-pgp7.onrender.com/api/products/${editingProduct._id}`, data);
      } else {
        await axios.post("https://riceshop-pgp7.onrender.com/api/products", data);
      }

      fetchProducts();
      setFormData({ name: "", price: "", description: "", image: null });
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price, description: product.description, image: null });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://riceshop-pgp7.onrender.com/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Product Management</h2>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowModal(true);
            setEditingProduct(null);
            setFormData({ name: "", price: "", description: "", image: null });
          }}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Add Item
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded mb-2" />
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full border p-2 rounded mb-2" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded mb-2"></textarea>
              <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded mb-2" />
              <div className="flex justify-between">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
                  {editingProduct ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-5 flex flex-col items-center">
            <img src={`https://riceshop-pgp7.onrender.com/uploads/${product.image}`} alt={product.name} className="w-80 h-80 object-cover rounded-lg" />
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="mt-2 text-lg text-gray-700">₹{product.price}</p>
              <p className="mt-2 text-sm text-gray-500">{product.description}</p>
              <div className="flex justify-between gap-3 mt-4">
                <button onClick={() => handleEdit(product)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-lg shadow-md">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-lg shadow-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
