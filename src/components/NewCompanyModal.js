import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useGlobalStore } from '../App';

export const NewCompanyModal = (props) => {
  const { selectedCompany, show, handleClose } = props;
  const { id, name, phn_no, address, website, industry } =
    selectedCompany || {};
  const { address_1, address_2, state, city, country, pin_code } =
    address || {};

  const { state: globalState } = useGlobalStore();
  const { token = null } = globalState || {};

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    phn_no: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  useEffect(() => {
    setFormData({
      name,
      phn_no,
      website,
      industry: industry || 'IT',
      address_1,
      address_2,
      state,
      city,
      country,
      pin_code,
    });
  }, [
    name,
    phn_no,
    website,
    industry,
    address_1,
    address_2,
    state,
    city,
    country,
    pin_code,
  ]);

  const changeFormData = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleHide = () => {
    handleClose();
  };

  const authToken = token || localStorage.getItem('aswiniAccessToken');
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: id ? 'put' : 'post',
      url: `http://localhost:8000/companydetails/${id ? `update/${id}` : ''}`,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });

    handleHide();
    window.location.reload();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/companydetails/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });
    window.location.reload();
    handleHide();
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title> {id ? 'Edit' : 'Add New'} Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row mb-3'>
            <p className='mb-2 text-muted'>Details</p>

            <div className='col'>
              <label htmlFor='name' className='mb-1'>
                Name
              </label>
              <input
                required
                type='text'
                id='name'
                name='name'
                className='form-control'
                value={formData.name}
                onChange={changeFormData}
              />
            </div>
            <div className='col'>
              <label htmlFor='website' className='mb-1'>
                Website
              </label>
              <input
                required
                type='text'
                id='website'
                name='website'
                className='form-control mb-3'
                value={formData.website}
                onChange={changeFormData}
              />
            </div>
            <div className='col-12'>
              <label htmlFor='phn_no' className='mb-1'>
                Phone Number
              </label>
              <input
                required
                type='text'
                id='phn_no'
                name='phn_no'
                className='form-control mb-3'
                value={formData.phn_no}
                onChange={changeFormData}
              />
            </div>
            <div className='col-12'>
              <label htmlFor='industry' className='mb-1'>
                Industry List
              </label>
              <select
                className='form-select'
                name='industry'
                id='industry'
                value={formData.industry}
                onChange={changeFormData}>
                <option value='Account'>Account</option>
                <option value='IT'>IT</option>
                <option value='Sales'>Sales</option>
                <option value='Health Care'>Health Care</option>
              </select>
            </div>
          </div>
          <div className='row mb-3'>
            <p className='mb-2 text-muted'>Address</p>
            <div className='col-sm-6 col-12'>
              <label htmlFor='address_1' className='mb-1'>
                Line 1
              </label>
              <input
                required
                type='text'
                id='address_1'
                name='address_1'
                className='form-control'
                value={formData.address_1}
                onChange={changeFormData}
              />
            </div>
            <div className='col-sm-6 col-12'>
              <label htmlFor='address_2' className='mb-1'>
                Line 2
              </label>
              <input
                required
                type='text'
                id='address_2'
                name='address_2'
                className='form-control mb-3'
                value={formData.address_2}
                onChange={changeFormData}
              />
            </div>
            <div className='col-sm-6 col-12'>
              <label htmlFor='city' className='mb-1'>
                City
              </label>
              <input
                required
                type='text'
                id='city'
                name='city'
                className='form-control'
                value={formData.city}
                onChange={changeFormData}
              />
            </div>
            <div className='col-sm-6 col-12'>
              <label htmlFor='state' className='mb-1'>
                State
              </label>
              <input
                required
                type='text'
                id='state'
                name='state'
                className='form-control mb-3'
                value={formData.state}
                onChange={changeFormData}
              />
            </div>
            <div className='col-sm-6 col-12'>
              <label htmlFor='country' className='mb-1'>
                Country
              </label>
              <input
                required
                type='text'
                id='country'
                name='country'
                className='form-control'
                value={formData.country}
                onChange={changeFormData}
              />
            </div>
            <div className='col-sm-6 col-12'>
              <label htmlFor='pin_code' className='mb-1'>
                Pin Code
              </label>
              <input
                required
                type='text'
                id='pin_code'
                name='pin_code'
                className='form-control'
                value={formData.pin_code}
                onChange={changeFormData}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-between'>
          {id && (
            <button
              type='button'
              className='d-block  btn btn-danger mr-auto'
              onClick={handleDelete}>
              Delete
            </button>
          )}
          <div>
            <button type='button' className='btn' onClick={handleHide}>
              Close
            </button>
            <button type='submit' className='btn btn-outline-primary'>
              Save
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
