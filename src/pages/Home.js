import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '../App';
import { useNavigate } from 'react-router-dom';

import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import { NewCompanyModal } from '../components/NewCompanyModal';

// const $ = require('jquery');
// $.DataTable = require('datatables.net');

const columns = [
  {
    title: 'Name',
    width: 120,
    data: 'name',
  },
  {
    title: 'Nickname',
    width: 180,
    data: 'nickname',
  },
];

export const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const { state, dispatch } = useGlobalStore();
  const { token = null } = state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      const authToken = token || localStorage.getItem('aswiniAccessToken');
      try {
        const { data } = await axios.get(
          'http://localhost:8000/companydetails/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: authToken,
            },
          }
        );
        setCompanies(data);

        $(document).ready(function () {
          $('#example').DataTable({
            paging: false,
            searching: false,
            autoWidth: true,
          });
        });
      } catch {
        navigate('/login');
      }
    };
    fetchCompany();
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch({ type: 'login', payload: { token: null } });
    localStorage.removeItem('aswiniAccessToken');
    navigate('/login');
  };

  return (
    <div className='d-flex justify-content-center pt-5'>
      <div style={{ maxWidth: 900 }}>
        <h1 className='mb-4 text-center'>List of Companies</h1>
        <button
          className='btn btn-outline-dark d-block mx-auto mb-3'
          onClick={() => {
            setShowDialog(true);
            setSelectedCompany({});
          }}>
          Add New Company
        </button>
        <button
          className='btn btn-outline-danger d-block mx-auto mb-3'
          onClick={handleLogout}>
          Logout
        </button>
        <p className='my-3 text-center text-muted'>
          Double click on a company to edit
        </p>
        <table id='example'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Website</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Industry List</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => {
              const { id, name, phn_no, address, website, industry } = company;
              const { address_1, address_2, state, city, country } =
                address || {};

              return (
                <tr
                  style={{ cursor: 'pointer' }}
                  key={id}
                  onDoubleClick={(e) => {
                    // console.log(company);
                    setShowDialog(true);
                    setSelectedCompany(company);
                  }}>
                  <td align='center'>{name}</td>
                  <td align='center'>{website}</td>
                  <td align='center'>{phn_no}</td>
                  <td align='center'>
                    {address_1}&nbsp;{address_2}
                  </td>
                  <td align='center'>{city}</td>
                  <td align='center'>{state}</td>
                  <td align='center'>{country}</td>
                  <td align='center'>{industry}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <NewCompanyModal
        selectedCompany={selectedCompany}
        show={showDialog}
        handleClose={() => {
          setShowDialog(false);
          setSelectedCompany({});
        }}
      />
    </div>
  );
};
