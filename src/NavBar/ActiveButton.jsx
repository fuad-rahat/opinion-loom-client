import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveButton = ({ buttonName, address, sstyle, isActive, onClick }) => {
  const handleButtonClick = () => {
    onClick(address); // Pass the address to the parent component to handle active state
  };

  return (
    <NavLink
      to={address}
      exact
      className={`${sstyle} btn ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-800'}`}
      onClick={handleButtonClick}
    >
      {buttonName}
    </NavLink>
  );
};

export default ActiveButton;
