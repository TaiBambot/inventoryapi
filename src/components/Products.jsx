import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
    costPrice: 0,
    sellingPrice: 0,
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/products', newProduct);
      toast.success('Product added successfully');
      fetchProducts();
      setNewProduct({
        name: '',
        quantity: 0,
        price: 0,
        costPrice: 0,
        sellingPrice: 0,
        description: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="border rounded p-2"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border rounded p-2"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
              required
              min="0"
            />
            <input
              type="number"
              placeholder="Cost Price"
              className="border rounded p-2"
              value={newProduct.costPrice}
              onChange={(e) => setNewProduct({ ...newProduct, costPrice: parseFloat(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder="Selling Price"
              className="border rounded p-2"
              value={newProduct.sellingPrice}
              onChange={(e) => setNewProduct({ ...newProduct, sellingPrice: parseFloat(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>
          <textarea
            placeholder="Description"
            className="border rounded p-2 w-full"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.costPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.sellingPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;