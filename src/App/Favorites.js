import React from 'react';
import { connect } from 'react-redux';
import {  FaPlay } from 'react-icons/fa';

import {  addRecently, playSong } from '../actions/favorites';


  class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.fav=[];
        this.state={rep: props.data.favorites ? props.data.favorites[0].audio : ''}
    }

    handlePlay(song) {
      this.setState({'rep':song})
      this.props.addRecently(song);
      this.props.playSong(song);
    }

    render() {
      return <div>
                <ul>
                  {this.props.favorites.songs.length === 0 
                    ?
                    <span>{'No tienes ningún favorito'}</span>
                    :
                  <div>
                      {this.props.favorites.songs.map(fav => 
                      <div key={fav.id} className='listaRepro'> 
                               <FaPlay className='iconPlay'
                               style={this.state.rep.name === fav.name ? {color:'#496D90'} : {color:'white'}} 
                               onClick={()=> this.handlePlay(fav)} 
                             /> 
                        <div onClick={()=> this.handlePlay(fav)} >
                          {fav.name}
                        </div>
                        </div>
                      )}
                  </div>
                  } 
                </ul>         
      </div>
    }
}

const mapDispatchToProps = {
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
)(Favorites);
