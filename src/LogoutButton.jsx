import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({ onClick }) => (
  <button className="btn btn-primary" onClick={onClick}>Log out</button>
);
LogoutButton.propTypes = {
  onClick: PropTypes.func,
};

export default LogoutButton;
