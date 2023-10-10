// components/PatientForm.js
"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TestDetailsForm  from "../test_info/page";

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
// const [submitData, setSubmitData] = useState({})
  const submitApi = async() => {
     
    console.log("formDZata is:", combinedData);
    console.log("type of submitData is", typeof(combinedData));
    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((combinedData) => {
        console.log("Success:", combinedData);
        alert("Patient Details Added Successfully");
      })
      .catch((error) => {
        console.error("ErroriZ:", error);
      });
  }


  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

   


    fetch("/api/form/invoiceapi", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the invoice number in your formData
        console.log("Highest_Iinvoice number1:", typeof(data));
        console.log("Highest_Iinvoice number2:", {data});
        console.log("Highest_Iinvoice number3:", {data});

        const newInvoiceNum = String(parseInt(data.highestInvoiceNum) + 1);
        setFormData({ ...formData, invoiceNum: newInvoiceNum });
        console.log("Highest invoice number:", newInvoiceNum);

      })
      .catch((error) => {
        console.log("Fetching highest invoice number failed:", error);
      });


      // console.log("respnseIZact", formData);



    fetch("/api/form/ddowns/docsddown")
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
  },[]);
  const [propsData, setPropsData] = useState({});
  const [testDetailsData, setTestDetailsData] = useState({});
  const [fetchData, setFetchData] = useState(false);

// Call Search_INVOICE API
const searchInvoice = async() => {
   // Fetch combined data based on the invoice number
   setFetchData(true);

   const pot = await formData.invoiceNum;
   console.log("NOwSentInvoice is:", typeof(formData.invoiceNum));
   console.log("Thef9SentInvoice is:", pot);

   fetch(`/api/form/searchInvoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pot),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((searchInv) => {
      setStartDate(new Date(searchInv.netFormData.date));
      setFormData({
        date: searchInv.netFormData.date || "",
        invoiceNum: searchInv.netFormData.invoiceNum || "",
        refBy: searchInv.netFormData.refBy || "",
        patientName: searchInv.netFormData.patientName || "",
        gender: searchInv.netFormData.gender || "",
        address: searchInv.netFormData.address || "",
        area: searchInv.netFormData.area || "",
        district: searchInv.netFormData.district || "",
        contact: searchInv.netFormData.contact || ""
      })
// console.log("searchInv is:", searchInv.netFormData);
        resetFetchData();

      const obj = Object.values(searchInv.netFormData).filter(
        (value) => typeof value === 'object' && value !== null
      );

      const cO = obj.reduce((result: Record< any, any>, obj, index) => {
        result[index] = obj;
        return result;
      }, {});

      // setTestDetailsData(cO);
      console.log("detilstest", testDetailsData);
      setTimeout(() => {

        setTestDetailsData(cO);

      },1000);
      
      // for (const obx of obj){
  //       console.log("obx is:", cO);
  //       console.log("BEFOREobx is:", propsData);
  // // setPropsData([]);
  // // setPropsData(cO);
  // console.log("2obx is:", propsData);

    })
    .catch((error) => {
      console.log('Fetching combined data failed:', error);
    });



}
useEffect(() => {
  console.log("settignPropsdata", testDetailsData); 
  setPropsData({testDetailsData});
  // console.log("Updated propsData:", propsData);
}, [testDetailsData]);

  const receiveDataFromChild = (data: any) => {
    // Do something with the data received from the child
    console.log("Data received from child:", data);
    console.log("patient in recform data is:", formData);
  
    setPropsData(data);
  };
  const [combinedData, setCombinedData] = useState({});

  // Update combinedData whenever either propsData or formData changes
  useEffect(() => {
    const combinedObject = { ...propsData, ...formData };
    console.log("Combined data is:", combinedObject);
    setCombinedData(combinedObject);
    
  }, [propsData, formData]);
  
  const resetFetchData = () => {
    setFetchData(false);
  };

  
  return (
    <div>
          <TestDetailsForm onDataReceived={receiveDataFromChild} testDetailsData={testDetailsData}  fetchData={fetchData} resetFetchData={resetFetchData}  />

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
      <Button onClick={submitApi}>Submit</Button>
              <Button onClick={searchInvoice}>🔍</Button>

    </FormContainer>
 
   </div>
  );
}
