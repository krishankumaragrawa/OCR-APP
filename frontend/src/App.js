import './App.css';
import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import MyVerticallyCenteredModal from './components/Modal';
import Header from './components/Header';
import axios from 'axios'

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [name, setName] = useState("name");
  const [idNumber, setIdNumber] = useState();
  const [last_name, setLastName] = useState("lastname");
  const [date_of_birth, setDOB] = useState("date of birth");
  const [date_of_issue, setDOI] = useState('date of issue');
  const [date_of_expiry, setDOE] = useState("date of expiry");
  const [imageloading, setImageLoading] = useState(false);
  const [isFindingID, setisFindingID] = useState(false);

  const handleSave = async() => {
    setIsImageUploaded(false)
    const { data } = await axios.post('http://localhost:5000/api/citizen', {
      idNumber, 
      name, 
      last_name, 
      date_of_birth, 
      date_of_issue, 
      date_of_expiry
    })
  }
  const handleUploadID = () =>{
    setModalShow(true);
    setisFindingID(false);
  }
  const handleCancel = () =>{
    setIsImageUploaded(false);
    setisFindingID(false)
  }
  const handleDelete = async() =>{
    setIsImageUploaded(false);
    setisFindingID(false);
  }
  const handleFind = async (e) => {
    setIdNumber(e.target.value);
    try {
      const response = await axios.post('http://localhost:5000/api/citizen', {
        idNumber
      });
  
      const { name, last_name, date_of_birth, date_of_issue, date_of_expiry } = response.data;
  
      setDOB(date_of_birth);
      setDOE(date_of_expiry);
      setName(name);
      setLastName(last_name);
      setDOI(date_of_issue)
      setisFindingID(true);
    } catch (error) {
      console.error('Error during data retrieval:', error.message);
      // Handle error as needed (e.g., set an error state)
    }
  };
  return (
    <>
      <Header />
      <div className='container'>
        <div className='form_outline'>
        {!isImageUploaded && !imageloading ? (
  <Button variant="light" onClick={handleUploadID}>
    Upload ID Card
  </Button>
) : (
  isImageUploaded && !imageloading ? (
    <Image src={image} thumbnail style={{ maxHeight: '200px' }} />
  ) : (
    // The third case can be left empty or filled with another component or text
    null
  )
)}
<div>
      <input
        type="text"
        placeholder="Enter ID number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
      />
      <Button variant="light" onClick={handleFind}>
        Find Details by ID number
      </Button>
    </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setImage={setImage}
            setIsImageUploaded={setIsImageUploaded}
            setDOB = {setDOB}
            setDOE ={setDOE}
            setDOI = {setDOI}
            setIdNumber = {setIdNumber}
            setLastName = {setLastName}
            setName = {setName}
            setImageLoading = {setImageLoading}
          />
          {!imageloading && isImageUploaded ? (
            <div className="d-flex flex-column align-items-center">
              <h6 className='my-2'>Name: {name}</h6>
              <h6 className='my-2'>Last Name: {last_name}</h6>
              <h6 className='my-2'>ID Number: {idNumber}</h6>
              <h6 className='my-2'>Date Of Birth: {date_of_birth}</h6>
              <h6 className='my-2'>Date Of Issue: {date_of_issue}</h6>
              <h6 className='my-2'>Date Of Expiry: {date_of_expiry}</h6>
              <div className="my-3">
                <Button className='mt-3 ml-2' variant="success" onClick={handleSave}>
                  Save
                </Button>
                <Button className='mt-3 mr-2' variant="primary" onClick={() => setIsImageUploaded(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            !isImageUploaded && imageloading ? ( 
              <h2>Loading Details....</h2>
            ) : (
              null
            )
          )}
          {isFindingID  ? (
            <div className="d-flex flex-column align-items-center">
              <h6 className='my-2'>Name: {name}</h6>
              <h6 className='my-2'>Last Name: {last_name}</h6>
              <h6 className='my-2'>Date Of Birth: {date_of_birth}</h6>
              <h6 className='my-2'>Date Of Issue: {date_of_issue}</h6>
              <h6 className='my-2'>Date Of Expiry: {date_of_expiry}</h6>
              <div className="my-3">
                <Button className='mt-3 ml-2' variant="success" onClick={handleDelete}>
                  Delete ID
                </Button>
                <Button className='mt-3 mr-2' variant="primary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            null
          )}
        </div>
      </div>
    </>
  );
};

export default App;
