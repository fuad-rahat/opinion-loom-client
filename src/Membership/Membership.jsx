import React, { useState, useContext } from 'react';
import ReactCreditCards from 'react-credit-cards-2';
import './card.css';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";
import { AuthContext } from '../Providers/AuthProviders';
import useUsers from '../Hooks/useUsers';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Membership = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [users, refetch] = useUsers();
  const match = users.find(m => m?.email === user?.email);

  const [state, setState] = useState({
    number: "",
    name: user?.displayName,
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState(prevState => ({ ...prevState, issuer }));
    }
  };

  const handleInputFocus = ({ target }) => {
    setState(prevState => ({
      ...prevState,
      focused: target.name
    }));
  };

  const handleInputChange = ({ target }) => {
    let value = target.value;
    if (target.name === "number") {
      value = formatCreditCardNumber(value);
    } else if (target.name === "expiry") {
      value = formatExpirationDate(value);
    } else if (target.name === "cvc") {
      value = formatCVC(value);
    }

    setState(prevState => ({
      ...prevState,
      [target.name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { issuer } = state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setState(prevState => ({
      ...prevState,
      formData
    }));
    e.target.reset();

    if (match && match._id) {
      axiosSecure.patch(`/users/${match._id}`)
        .then(res => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Payment Successful`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log(res.data);
          refetch();
        })
        .catch(err => {
          console.error(err);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Payment Failed`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      console.error('User not found or _id is undefined');
    }
  };

  const { name, number, expiry, cvc, focused, issuer, formData } = state;

  return (
    <div className="pt-32 flex flex-row-reverse justify-center items-start min-h-screen bg-gray-100">
      <div className='px-4 rounded-xl'>
        {formData && (
          <div className="App-highlight mt-4 p-4 bg-gray-50 rounded-lg">
            {formatFormData(formData).map((d, i) => (
              <div key={i} className="text-gray-700">{d}</div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <ReactCreditCards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={handleCallback}
            locale={{ valid: 'valid thru' }}
            placeholders={{ number: '•••• •••• •••• ••••', name: 'YOUR NAME HERE' }}
            acceptedCards={['visa', 'mastercard', 'amex']}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block mb-1 text-gray-700">Card Number</label>
            <input
              type="tel"
              name="number"
              className="form-control w-full px-4 py-2 border-2 rounded-lg border-green-400"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <small className="text-gray-500">E.g.: 49..., 51..., 36..., 37...</small>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 text-gray-700">Valid Thru</label>
              <input
                type="tel"
                name="expiry"
                className="form-control w-full px-4 py-2 border-2 rounded-lg border-green-400"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-gray-700">CVC</label>
              <input
                type="tel"
                name="cvc"
                className="form-control w-full px-4 py-2 border-2 rounded-lg border-green-400"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <input type="hidden" name="issuer" value={issuer} />
          <div className="form-actions mt-4">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">
              PAY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Membership;
