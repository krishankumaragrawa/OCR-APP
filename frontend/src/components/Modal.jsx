import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const UploadModal = (props) => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    props.setImageLoading(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post('http://localhost:5000/upload', formData, config);

      const { identification_number, name, last_name, date_of_birth, date_of_issue, date_of_expiry } = response.data;
      props.setIdNumber(identification_number);
      props.setName(name);
      props.setLastName(last_name);
      props.setDOB(date_of_birth);
      props.setDOI(date_of_issue);
      props.setDOE(date_of_expiry);
      props.setIsImageUploaded(true);

      console.log(name);
      console.log(last_name);

      props.setImageLoading(false);
      props.setIsImageUploaded(true);
    } catch (error) {
      console.error('Error uploading image:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleUpload = () => {
    props.setImage(URL.createObjectURL(file));
    setFile(null);
    props.onHide();
  };

  const handleRemoveById = () => {
    const idToRemove = props.getIdNumberToRemove();

    if (idToRemove) {
      props.removeEntryById(idToRemove);
      props.onHide();
    } else {
      console.log('No ID number provided for removal.');
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpload} disabled={!file}>
          Upload
        </Button>
        <Button variant="danger" onClick={handleRemoveById}>
          Remove by ID
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;
