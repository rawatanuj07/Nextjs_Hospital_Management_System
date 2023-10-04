// components/PatientForm.js
"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormContainer = styled.div`
  background-color: indigo;
  color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  label {
    flex: 1;
    margin-right: 10px;
  }

  input,
  select {
    color: black;
    flex: 3;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  select {
    background-color: white;
  }
  span {
    color: green;
    margin-left: 5px;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export default function PatientForm() {
  const [startDate, setStartDate] = useState<Date | null>(null); // Initialize with null or a default date

  const [formData, setFormData] = useState({
    date: "",
    invoiceNum: "",
    refBy: "",
    patientName: "",
    gender: "",
    address: "",
    area: "",
    district: "",
    contact: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangew = (date: Date | null) => {
    setStartDate(date);
    setFormData({ ...formData, date: date?.toISOString() || '' });
  };
  type Doctor = {
    _id: string;
    name: string;
    // Add other properties as needed
  };

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/api/ddowns/docsddown")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Doctors data:", data);
        setDoctors(data);
      })
      .catch((error) => {
        console.log("Fetching doctors data failed:", error);
      });
  }, []);

  return (
    <FormContainer>
      <h1>Patient Details</h1>
      <FormGroup>
        <label>Date:</label>

        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            handleChangew(date); // Update the formData with the selected date
          }}
          dateFormat="yyyy-MM-dd" // Define date format
          placeholderText="Select a date" // Placeholder text
          calendarClassName="custom-datepicker" // Apply custom CSS class
        />
        {formData.date&& <span>&#10003;</span>}

      </FormGroup>
      
      <FormGroup>
        <label>Invoice Number:</label>
        <input
          type="text"
          name="invoiceNum"
          value={formData.invoiceNum}
          onChange={handleChange}
        />
        {formData.invoiceNum && <span>&#10003;</span>}
      </FormGroup>

      <FormGroup>
        <label>Ref By:</label>
        <select name="refBy" value={formData.refBy} onChange={handleChange}>
          {doctors.map((doctor: any) => (
            <option key={doctor._id} value={doctor.doctor_name}>
              {doctor.doctor_name}
            </option>
          ))}
        </select>
        {formData.refBy && <span>✓</span>}
      </FormGroup>

      {/* Repeat similar FormGroup for other fields */}
      <FormGroup>
        <label>Patient Name:</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
        />
        {formData.patientName && <span>&#10003;</span>}
      </FormGroup>
      <FormGroup>
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        {formData.gender && <span>&#10003;</span>}
      </FormGroup>
      <FormGroup>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {formData.address && <span>&#10003;</span>}
      </FormGroup>
      <FormGroup>
        <label>Area:</label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
        {formData.area && <span>&#10003;</span>}
      </FormGroup>
      <FormGroup>
        <label>District:</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
        />
        {formData.district && <span>&#10003;</span>}
      </FormGroup>
      <FormGroup>
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
        {formData.contact && <span>&#10003;</span>}
      </FormGroup>
      <Button>Submit</Button>
    </FormContainer>
  );
}
