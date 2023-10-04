"use client";
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: black;
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

  input {
    flex: 2;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  span {
    color: green;
    margin-left: 5px;
  }
`;

interface FormData {
  srNo: number;
  testName: string;
  price: string;
  quantity: string;
  amount: number;
}

export default function TestDetailsForm() {
  const [formData, setFormData] = useState<FormData[]>([{ srNo: 1, testName: '', price: '', quantity: '', amount: 0 }]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: name === 'srNo' ? parseInt(value) : value };
    setFormData(updatedFormData);

    if (name === 'testName' && !formData[index + 1]?.srNo) {
      updatedFormData[index + 1] = { ...updatedFormData[index + 1], srNo: formData[index].srNo + 1 };
      setFormData(updatedFormData);
    }
  };

  const handleCalculateTotal = () => {
    const calculatedTotal = formData.reduce((total, item) => {
      return total + (parseFloat(item.amount.toString()) || 0);
    }, 0);
    setTotalPrice(calculatedTotal);
  };

  return (
    <FormContainer>
      <h1>Test Details</h1>
      <FormGroup>
        <label>Sr No:</label>
        <label>Test Name:</label>
        <label>Price:</label>
        <label>Quantity:</label>
        <label>Amount:</label>
      </FormGroup>
      {formData.map((row, index) => (
        <FormGroup key={index}>
          <input type="text" name="srNo" value={row.srNo} onChange={(e) => handleChange(e, index)} readOnly />
          <input type="text" name="testName" value={row.testName} onChange={(e) => handleChange(e, index)} />
          <input type="text" name="price" value={row.price} onChange={(e) => handleChange(e, index)} />
          <input type="text" name="quantity" value={row.quantity} onChange={(e) => handleChange(e, index)} />
          <input type="text" name="amount" value={row.amount} onChange={(e) => handleChange(e, index)} />
          {row.amount && <span>&#10003;</span>}
        </FormGroup>
      ))}
      {/* <Button onClick={handleCalculateTotal}>Calculate Total</Button> */}
      <h3>Total Price: {totalPrice}</h3>
    </FormContainer>
  );
}
