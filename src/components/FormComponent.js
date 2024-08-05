import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormComponent = ({ addUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    district: '',
    province: '',
    country: 'Nepal',
    profilePicture: null,
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common);
        setCountries(countryNames);
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (formData.profilePicture && formData.profilePicture.type !== 'image/png') {
      newErrors.profilePicture = 'Only PNG images are allowed';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addUser(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dob: '',
        city: '',
        district: '',
        province: '',
        country: 'Nepal',
        profilePicture: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Fields with Error Messages */}
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      {errors.name && <span>{errors.name}</span>}

      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <span>{errors.email}</span>}

      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
      {errors.phone && <span>{errors.phone}</span>}

      <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />

      <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" />

      <select name="province" value={formData.province} onChange={handleChange}>
        <option value="">Select Province</option>
        {[...Array(7)].map((_, i) => (
          <option key={i} value={`Province ${i + 1}`}>Province {i + 1}</option>
        ))}
      </select>

      <select name="country" value={formData.country} onChange={handleChange}>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <input type="file" onChange={handleFileChange} />
      {errors.profilePicture && <span>{errors.profilePicture}</span>}

      <button type="submit">Add Entry</button>
    </form>
  );
};

export default FormComponent;
