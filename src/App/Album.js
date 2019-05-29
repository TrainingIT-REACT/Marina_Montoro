import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {  FaPlay } from 'react-icons/fa';

import { addFavorites, deleteFavorites, addRecently, playSong } from '../actions/favorites';

const handlePlay=(song, addRecently, playSong) => {
  addRecently(song);
  playSong(song);
  
}
const Album = (props) => {

  const list = props.data.songs.filter(song => {return props.album.id === song.album_id})

  return (
    <Container>
      <Row>
        <Col sm={4} className="albumList">
          <div>{props.album.name} {props.album.artist}</div>
          <div><img src={props.album.cover} height="200" width="200"/></div>
        </Col>
        <Col sm={8} className="albumRepo"> 
          {list.map(song => 
            <div key={song.id} className='listaRepro'> 
              <FaPlay className='iconPlay'
                style={props.favorites.playSong.name === song.name ? {color:'#496D90'} : {color:'white'}} 
                onClick={()=> handlePlay(song,props.addRecently, props.playSong)} 
              /> 
            <div onClick={()=> handlePlay(song,props.addRecently, props.playSong)} >
            {song.name}
            </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

const mapDispatchToProps = {
  addFavorites,
  deleteFavorites,
  addRecently,
  playSong
};

const mapStateToProps = ({
  favorites,
  data
}) => ({favorites, data});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Album);
