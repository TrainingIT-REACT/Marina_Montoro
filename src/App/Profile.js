import React from 'react';
import { connect } from 'react-redux';

import {  addRecently, playSong } from '../actions/favorites';

class Favorites extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return <div className="tituloProfile"> ! Hola {this.props.user.name} ! </div>
  }
}

const mapDispatchToProps = {
  addRecently,
  playSong
};

const mapStateToProps = ({
  favorites,
  data,
  user
}) => ({favorites, data, user});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);
