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


export default function TestDetailsForm( { onDataReceived, testDetailsData, fetchData, resetFetchData }: any )  {
    type TestData = Record<string, number>;

    const [testNames, setTestNames] = useState<string[]>([]);
    const [testNameToPrice, setTestNameToPrice] = useState<TestData>({});

    // const [selectedTest, setSelectedTest] = useState('');
    const [selectedTestPrices, setSelectedTestPrices] = useState<string[]>([]);
    const [datas, setData] = useState<TestData | null>(null);

    const [selectedTestName, setSelectedTestName] = useState("");
    const [selectedTestPrice, setSelectedTestPrice] = useState("");
  
    useEffect(() => {
      fetch('/api/form/ddowns/test_details')
      .then((response) => response.json() as unknown as TestData) // Use type assertion
      .then((data) => {
        const testNames = Object.keys(data[0]);
        const testPrice: any = Object.values(data[0]);
        console.log("full data is", data);
        setData(data);


        setTestNames(testNames);
        setTestNameToPrice(testPrice);
        // setSelectedTestPrices(Array(testNames.length).fill(""));


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
    {   srNo: 1, 
      testName: "",
      price: "", 
      quantity: "", 
      amount: 0 },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [propData, setPropData] = useState({});





  
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: name === "srNo" ? parseInt(value) : value,
    //   price: selectedTestPrice,
    };
    console.log("name is", name);
    console.log("value is", value);
    console.log("formData is", formData);

    if (name === "testName") {

    const handleTestNameChange = (testName: string) => {
        console.log("Test name:", testName);
        console.log("Test name to price mapping:", testNameToPrice);
        console.log("datasss is ", datas);
        // Update the selected test price for this row
            const finalTestPrice = datas![0][testName]|| "";
        setSelectedTestPrice(finalTestPrice);
        updatedFormData[index].price = finalTestPrice;
        console.log("Selected test price:", finalTestPrice);
      };
            handleTestNameChange(value); // Call the function to update price

    }
    else if (name === "quantity") {
        // Calculate the amount based on price and quantity
        const price = parseFloat(updatedFormData[index].price);
        const quantity = parseFloat(value);
        const amount = isNaN(price) || isNaN(quantity) ? 0 : price * quantity;
        updatedFormData[index].amount = amount;

        console.log("QuanAmt", formData);

      }
    setFormData(updatedFormData);
    console.log("finaLLformData is", formData);


    if (name === "testName" && !formData[index + 1]?.srNo) {
      updatedFormData[index + 1] = {
        ...updatedFormData[index + 1],
        srNo: formData[index].srNo + 1,
      };
      setFormData(updatedFormData);
    }
  };


 useEffect(() => {
  // Calculate the total price whenever formData changes
  const calculatedTotal = formData.reduce((total, item) => {
    return total + (parseFloat(item.amount) || 0);
  }, 0);
  setTotalPrice(calculatedTotal);
  console.log("totalFormReal is", formData);
  console.log("totalpriceiZ is", calculatedTotal);
  const newArray = formData.map((obj) => ({
    ...obj, // Copy the existing object properties
    "total price": calculatedTotal, // Add the new property with the specified number
  }));
  console.log("total price is", formData)
  console.log("newArray is", newArray);
  setPropData(newArray);
}, [formData]);

  console.log("newArray is", propData);




  useEffect(() => {
    // Log the received testDetailsData
    
    // if (testDetailsData) {
    //   const convertedData = testDetailsData.map((item, index) => ({
    //     srNo: index + 1,
    //     testName: item.testName || "",
    //     price: item.price || "",
    //     quantity: item.quantity || "",
    //     amount: item.amount || 0,
    //   }));
    if (testDetailsData) {
      const convertedData = Object.keys(testDetailsData).map((key, index) => ({
        srNo: index + 1,
        testName: testDetailsData[key].testName || "",
        price: testDetailsData[key].price || "",
        quantity: testDetailsData[key].quantity || "",
        amount: testDetailsData[key].amount || 0,
    }));
      setFormData(convertedData);

    }


    console.log('Received testDetailsData:', testDetailsData);
    // setFormData(convertedData);
  // fetchData(false);
  }, [testDetailsData, fetchData]);
  // useEffect(() => {

  //   // Pass the data to the parent component using the callback function
  //   onDataReceived(propData || {});
  // }, [propData]);
  // resetFetchData();

      onDataReceived(propData);
      // testDetailsData(propData);
      useEffect(() => {
        if (formData.length === 0) {
          setFormData([
            {
              srNo: 1,
              testName: "",
              price: "",
              quantity: "",
              amount: 0,
            },
          ]);
        }
      }, [formData]);

  return (<>
    <FormContainer>
      <h1>Test Details</h1>
      <FormGroup>
        <label>Sr No:</label>
        <label>Test Name:</label>
        <label>Price:</label>
        <label>Quantity:</label>
        <label>Amount:</label>
      </FormGroup>

      
    {(formData).map((row, index) => (
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
            value={row.price}
            readOnly
          />
          <input
            type="text"
            name="quantity"
            value={row.quantity}
            onChange={(e) => handleChange(e, index)}
            // readOnly
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
      <Button >Calculate Total</Button>
      <h3>Total Price: {totalPrice}</h3>
    </FormContainer>
    </>
  );
}
