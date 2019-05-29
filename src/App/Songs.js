import React from 'react';
import { connect } from 'react-redux';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { addFavorites, deleteFavorites, addRecently, playSong } from '../actions/favorites';


//const Songs = ({songs}) => {
  class Songs extends React.Component {
    constructor(props) {
        super(props); 
        this.handleFavorite = this.handleFavorite.bind(this);
        this.state={rep: props.data.songs[0].audio}
    }

    handleFavorite(song) {
      const fav = document.getElementsByClassName(song.name)[0];
      if(fav.style.color === 'red'){
        fav.style.color='white'
        //borrar elemento favoritos
        this.props.deleteFavorites(song);
      } else {
      fav.style.color='red'
      //añadir elemento a favoritos
      this.props.addFavorites(song);
      }
    }

    handlePlay(song) {
      this.setState({'rep':song})
      this.props.addRecently(song);
      this.props.playSong(song);
      
    }

    render(){
  return <div className="info">
            <ul>
              <div>
                  {this.props.data.songs.map(song => {
                   return (
                
                   <div key={song.id} style={{heigth:'200px'}} className='listaRepro'>
                     <div className='iconHeart'>
                      <FaHeart 
                        style={this.props.favorites && this.props.favorites.songs.find((f) =>f.id === song.id) ? {color:'red'} : {color:'white'}} 
                        className={song.name} 
                        onClick={()=> this.handleFavorite(song)} 
                      /> 
                      </div>
                      <FaPlay  className='iconPlay'
                        style={this.state.rep.name === song.name ? {color:'green'} : {color:'white'}} 
                        onClick={()=> this.handlePlay(song)} 
                      /> 
                    {song.name}
                    </div>
                    )
                  }
                  )}

              </div> 
            </ul>  
            </div>
            {/* <div>
            <audio style={{width:'100%', height:'50px'}} key={this.state.rep.id} name ={this.state.rep.id} src={this.state.rep.audio} type={"audio/mpeg"} preload="auto" controls></audio>
            </div> */}
       
    }
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
)(Songs);
