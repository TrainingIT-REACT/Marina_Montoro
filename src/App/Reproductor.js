//import React from 'react';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Reproductor = (props) => {

  return (
          <div>
            <audio className="audio" key={props.favorites.playSong.id} src={props.favorites.playSong.audio} type={"audio/mpeg"} preload="auto" controls autoPlay></audio>
          </div>

  )
}

const mapStateToProps = ({
  favorites
}) => ({favorites});

export default connect(
  mapStateToProps)(Reproductor);