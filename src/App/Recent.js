import React from 'react';
import { connect } from 'react-redux';
import {  FaPlay } from 'react-icons/fa';

import {  addRecently, playSong } from '../actions/favorites';


  class Recent extends React.Component {
    constructor(props) {
        super(props);
        this.fav=[];
        this.state={rep: props.data.recently ? props.data.recently[0].audio : ''}
    }

    handlePlay(song) {
      this.setState({'rep':song})
      this.props.addRecently(song);
      this.props.playSong(song);
    }

    render() {
      return <div>
                <ul>
                  {this.props.favorites.recently.length === 0 
                    ?
                    <span>{'Aún no has escuchado ninguna canción'}</span>
                    :
                  <div >
                      {this.props.favorites.recently.map(rec => 
                      <div key = {rec.id} className='listaRepro'> 
                               <FaPlay className='iconPlay'
                               style={this.state.rep.name === rec.name ? {color:'green'} : {color:'white'}} 
                               onClick={()=> this.handlePlay(rec)} 
                             /> 
                        <div onClick={()=> this.handlePlay(rec)} >
                          {rec.name}
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
)(Recent);
