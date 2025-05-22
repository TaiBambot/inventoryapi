import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Sales() {
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState({
    customerName: '',
    date: new Date().toISOString().slice(0, 16),
    products: [{ name: '', quantity: 1, price: 0 }]
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/sales', sale);
      toast.success('Sale recorded successfully');
      setSale({
        customerName: '',
        date: new Date().toISOString().slice(0, 16),
        products: [{ name: '', quantity: 1, price: 0 }]
      });
    } catch (error) {
      console.error('Error recording sale:', error);
      toast.error('Failed to record sale');
    }
  };

  const addProduct = () => {
    setSale({
      ...sale,
      products: [...sale.products, { name: '', quantity: 1, price: 0 }]
    });
  };

  const updateProduct = (index, field, value) => {
    const updatedProducts = [...sale.products];
    if (field === 'name') {
      const selectedProduct = products.find(p => p.name === value);
      if (selectedProduct) {
        updatedProducts[index] = {
          ...updatedProducts[index],
          name: value,
          price: selectedProduct.sellingPrice
        };
      }
    } else {
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    }
    setSale({ ...sale, products: updatedProducts });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Record New Sale</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="border rounded p-2 w-full"
          value={sale.customerName}
          onChange={(e) => setSale({ ...sale, customerName: e.target.value })}
          required
        />

        <input
          type="datetime-local"
          className="border rounded p-2 w-full"
          value={sale.date}
          onChange={(e) => setSale({ ...sale, date: e.target.value })}
          required
        />

        {sale.products.map((product, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="border rounded p-2"
              value={product.name}
              onChange={(e) => updateProduct(index, 'name', e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} (${p.sellingPrice})
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="border rounded p-2"
              value={product.quantity}
              onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value))}
              required
              min="1"
            />
            <input
              type="number"
              placeholder="Price"
              className="border rounded p-2"
              value={product.price}
              onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value))}
              required
              min="0"
              step="0.01"
            />
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addProduct}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Add Product
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Record Sale
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sales;