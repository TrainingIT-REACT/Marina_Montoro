import React from 'react';
import { connect } from 'react-redux';
import { FaUser } from 'react-icons/fa';

const Admin = ({name}) => {
  return <div className="user"> <FaUser /> {name}</div>
  
}

const mapStateToProps = (state) => {
  return {
    name: state.user.name
  }
}

export default connect(
  mapStateToProps)(Admin);
