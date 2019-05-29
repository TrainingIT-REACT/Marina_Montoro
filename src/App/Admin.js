import React from 'react';
import { connect } from 'react-redux';

const Admin = ({name}) => {
  return <div>
    <h2 className="name">Hola! {name}</h2>
    <p>
    </p>
  </div>;
}

const mapStateToProps = (state) => {
  return {
    name: state.user.name
  }
}

export default connect(
  mapStateToProps)(Admin);
