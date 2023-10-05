"use client";
import React, { useState, useEffect} from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
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
    type TestData = Record<string, number>;

    const [testNames, setTestNames] = useState<string[]>([]);
    const [testNameToPrice, setTestNameToPrice] = useState<TestData>({});

    // const [selectedTest, setSelectedTest] = useState('');
    const [selectedTestPrices, setSelectedTestPrices] = useState<string[]>([]);
    const [datas, setData] = useState<TestData | null>(null);

    const [selectedTestName, setSelectedTestName] = useState("");
    const [selectedTestPrice, setSelectedTestPrice] = useState<number | undefined>(undefined);
  
    useEffect(() => {
      fetch('/api/ddowns/tests')
      .then((response) => response.json() as unknown as TestData) // Use type assertion
      .then((data) => {
        const testNames = Object.keys(data[0]);
        const testPrice: any = Object.values(data[0]);
        console.log("full data is", data);
        setData(data);


        setTestNames(testNames);
        setTestNameToPrice(testPrice);
        setSelectedTestPrices(Array(testNames.length).fill(""));


      })
        .catch((error) => {
          console.error('Fetching test names failed:', error);
        });
    }, []);
    console.log("testnamesAre", testNames);
    console.log("pricesAre",testNameToPrice);
    console.log("fullax data is", datas);
    console.log("FinalselectedTestPrices:", selectedTestPrices);





  const [formData, setFormData] = useState<FormData[]>([
    { srNo: 1, testName: "", price: "", quantity: "", amount: 0 },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//     index: number
//   ) => {
//     const { name, value } = e.target;
//     const updatedFormData = [...formData];
//     updatedFormData[index] = {
//       ...updatedFormData[index],
//       [name]: name === "srNo" ? parseInt(value) : value,
//     };

//     if (name === "testName") {
//         // Update the selected test price for this row
//         const selectedTestPrice = testNameToPrice[value] || "";
//         const updatedSelectedTestPrices = [...selectedTestPrices];
//         if (!updatedSelectedTestPrices[index]) {
//           updatedSelectedTestPrices[index] = "";
//         }
//         updatedSelectedTestPrices[index] = selectedTestPrice.toString();
//         setSelectedTestPrices(updatedSelectedTestPrices);
//       }
//     setFormData(updatedFormData);

//     if (name === "testName" && !formData[index + 1]?.srNo) {
//       updatedFormData[index + 1] = {
//         ...updatedFormData[index + 1],
//         srNo: formData[index].srNo + 1,
//       };
//       setFormData(updatedFormData);
//     }
//   };

const handleTestNameChange = (index: number, testName: string) => {
    console.log("Test name:", testName);
    console.log("Test name to price mapping:", testNameToPrice);
    console.log("datasss is ", datas);
    // Update the selected test price for this row
    const selectedTestPrice = datas[0][testName] || "";
    console.log("Selected test price:", selectedTestPrice);

    const updatedSelectedTestPrices = [...selectedTestPrices];
    updatedSelectedTestPrices[index] = selectedTestPrice.toString();
    setSelectedTestPrices(updatedSelectedTestPrices);
  };
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: name === "srNo" ? parseInt(value) : value,
    };
    console.log("name is", name);
    console.log("value is", value);

    if (name === "testName") {
      handleTestNameChange(index, value); // Call the function to update price
    }

    setFormData(updatedFormData);

    if (name === "testName" && !formData[index + 1]?.srNo) {
      updatedFormData[index + 1] = {
        ...updatedFormData[index + 1],
        srNo: formData[index].srNo + 1,
      };
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
          <input
            type="text"
            name="srNo"
            value={row.srNo}
            onChange={(e) => handleChange(e, index)}
            readOnly
          />
          {/* <input
            type="text"
            name="testName"
            value={row.testName}
            onChange={(e) => handleChange(e, index)}
          /> */}

          <select
            name="testName"
            value={row.testName}
            onChange={(e) => handleChange(e, index)}
          >
            <option value="">Select a test</option>
            {testNames.map((testName) => (
              <option key={testName} value={testName}>
                {testName}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="price"
            value={selectedTestPrice}
            readOnly
          />
          <input
            type="text"
            name="quantity"
            value={row.quantity}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="amount"
            value={row.amount}
            onChange={(e) => handleChange(e, index)}
          />
          {row.amount && <span>&#10003;</span>}
        </FormGroup>
      ))}
      <Button onClick={handleCalculateTotal}>Calculate Total</Button>
      <h3>Total Price: {totalPrice}</h3>
    </FormContainer>
  );
}
