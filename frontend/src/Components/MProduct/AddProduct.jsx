import React, { useState } from "react";
import Nav from "../Navp/Nav";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const history = useNavigate();
  const [errors, setErrors] = useState({});

  const [inputs, setInputs] = useState({
    ppid: "",
    name: "",
    image: "",
    description: "",
    price: "",
    quantity: "",
    manufactureDate: "",
    expireDate: "",
    stockAlertThreshold: "",
    reorderPoint: "",
    category: "",
    brand:"",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let error = "";
  
    if (name === "name" && (value.length < 3 || value.length > 50)) {
      error = "Name must be between 3 and 50 characters.";
    } else if (name === "description" && (value.length < 3 || value.length > 500)) {
      error = "Description must be between 3 and 500 characters.";
    } else if ((name === "price" || name === "quantity") && (isNaN(value) || parseFloat(value) <= 0)) {
      error = "Please enter a valid number greater than zero.";
    } else if ((name === "manufactureDate" || name === "expireDate") && !value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      error = "Date must be in the format YYYY-MM-DD.";
    } else if (name === "expireDate" && value === inputs.manufactureDate) {
      error = "Expire date cannot be the same as manufacture date.";
    } else if (name === "manufactureDate" && value === inputs.expireDate) {
      error = "Manufacture date cannot be the same as expire date.";
    } else if (value.trim() === "") {
      error = "This field is required.";
    }
  
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  
    if (name === "image") {
      // Update state with the selected file
      setInputs((prevState) => ({
        ...prevState,
        image: files[0], // Access the selected file
      }));
    } else {
      // For other input fields, update state with the input value
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // Send request to upload image
    const formData = new FormData();
    formData.append("image", inputs.image);

    try {
      // Wait for the image upload request to complete
      const response = await axios.post("http://localhost:5000/upload", formData);
      const imageUrl = response.data.image;
  
      // Once the image is uploaded, send the product data to the database
      await sendRequest(imageUrl);
  
      // Redirect to the display product page
      history("/displayproduct");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/products/add", {
        ppid: String(inputs.ppid),
        name: String(inputs.name),
        image: String(inputs.image.name),
        description: String(inputs.description),
        price: inputs.price,
        quantity: inputs.quantity,
        manufactureDate: String(inputs.manufactureDate),
        expireDate: String(inputs.expireDate),
        stockAlertThreshold: inputs.stockAlertThreshold,
        reorderPoint: inputs.reorderPoint,
        category: String(inputs.category),
        brand: String(inputs.brand),
      })
      .then((res) => res.data);
  };
  return (
    <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-64 pt-20 overflow-x-auto">
        <div className="grid grid-cols-10">
          <div className="col-span-2 bg-customBlue h-full p-4 w-50 fixed top-12 left-0">
            <Sidebar />
          </div>
          <div className="col-span-8 p-8 rounded-md shadow-md text-3xl text-center font-bold underline">
            <h1>Add Product Form</h1>
          </div>
          <form
            className="col-span-8 p-8 mt-4 rounded-md shadow-3xl border border-blue-700 border-blur-3xl border-opacity-30"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="font-bold">PPID:</label>
              <input
                type="text"
                name="ppid"
                onChange={handleChange}
                value={inputs.ppid}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              
            </div>
            <div className="mb-4">
              <label className="font-bold">Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="font-bold">Image:</label>
              <br />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                // required
              />
              {errors.image && <p className="text-red-500">{errors.image}</p>}
              {inputs.image && inputs.image.name && (
                <p className="mt-3">Selected file: {inputs.image.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Description:</label>
              <br />
              <textarea
                name="description"
                onChange={handleChange}
                value={inputs.description}
                className="border border-black p-2 w-full rounded-xl"
                rows="4"
                required
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Price:</label>
              <br />
              <input
                type="number"
                name="price"
                onChange={handleChange}
                value={inputs.price}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>
            <div className="mb-4">
              <label className="font-bold">Quantity:</label>
              <br />
              <input
                type="number"
                name="quantity"
                onChange={handleChange}
                value={inputs.quantity}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.quantity && (
                <p className="text-red-500">{errors.quantity}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Manufacture Date:</label>
              <br />
              <input
                type="text"
                name="manufactureDate"
                onChange={handleChange}
                value={inputs.manufactureDate}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.manufactureDate && (
                <p className="text-red-500">{errors.manufactureDate}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Expire Date:</label>
              <br />
              <input
                type="text"
                name="expireDate"
                onChange={handleChange}
                value={inputs.expireDate}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.expireDate && (
                <p className="text-red-500">{errors.expireDate}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Stock Alert Threshold:</label>
              <br />
              <input
                type="number"
                name="stockAlertThreshold"
                onChange={handleChange}
                value={inputs.stockAlertThreshold}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.stockAlertThreshold && (
                <p className="text-red-500">{errors.stockAlertThreshold}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Reorder Point:</label>
              <input
                type="number"
                name="reorderPoint"
                onChange={handleChange}
                value={inputs.reorderPoint}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.reorderPoint && (
                <p className="text-red-500">{errors.reorderPoint}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Category:</label>
              <br />
              <input
                type="text"
                name="category"
                onChange={handleChange}
                value={inputs.category}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.category && (
                <p className="text-red-500">{errors.category}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-bold">Brand:</label>
              <br />
              <input
                type="text"
                name="brand"
                onChange={handleChange}
                value={inputs.brand}
                className="border border-black p-2 w-full rounded-xl"
                required
              />
              {errors.brand && <p className="text-red-500">{errors.brand}</p>}
            </div>

            <button className="bg-blue-500 text-white text-lg py-4 px-8 rounded-xl">
              Submit
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}

export default AddProduct;
