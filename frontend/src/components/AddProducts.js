import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';



const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: ''
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/products/new-product', productData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          id="product-name"
          name="name"
          label="Product Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          id="product-description"
          name="description"
          label="Product Description"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          id="product-price"
          name="price"
          label="Product Price"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          id="product-quantity"
          name="quantity"
          label="Product Quantity"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          type="file"
          id="product-image"
          name="image"
          label="Product Image"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </form>
  );
}

export default AddProductForm;
