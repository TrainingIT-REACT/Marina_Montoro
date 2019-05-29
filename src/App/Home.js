import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../images/cover.jpg';
import Carousel from 'react-bootstrap/Carousel'
import { FaHeart } from 'react-icons/fa';
import { FaGitter } from 'react-icons/fa';
import { FaMusic } from 'react-icons/fa';
import { FaRegDotCircle } from 'react-icons/fa';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './Login';
import Albums from './Albums';
import Album from './Album';

import Songs from './Songs';
import Favorites from './Favorites';
import Recent from './Recent';

import Reproductor from './Reproductor';
import { saveAlbums, saveSongs, albumSelected } from '../actions/data';
import PrivateRoute from './PrivateRoute';


// Importamos los estilos
import "./App.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: [],
      songs: [],
      signedIn: false,
      updateUser: this.updateUser,
      index: 0,
      direction: null,
      viewAlbums: false,
      viewSongs: false
    }
    this.handleSelect = this.handleSelect.bind(this);

  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

   updateUser(signedIn) {
      this.setState(() => ({ signedIn }));
   }

   handleClick() {
    this.props.albumSelected(false)
   }

  async componentDidMount() {
    try {
      const albums = await fetch('/api/albums');
      const songs = await fetch('/api/songs');
      const jsonAlbums = await albums.json();
      this.props.saveAlbums(jsonAlbums);
      const jsonSongs = await songs.json();
      this.props.saveSongs(jsonSongs);
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        albums: jsonAlbums,
        songs: jsonSongs
      }));
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  render() {
    const { index, direction } = this.state;

    return (
      //<div>
        <Container className="container">
            <div>
              <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
                className="carousel"
              >
                {this.state.albums.map((album) =>
                  <Carousel.Item key={album.id} >
                  <img
                    
                    className="d-block w-100"
                    src={Logo}
                    height="200"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3></h3>
                  </Carousel.Caption>
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
            <div className="songsData">
              <div className="login">
                <Route component={Login}/>
              </div>
              <div >
              <Router>
                <div className="enlaces">
                <nav>
                  <div>
                      <NavLink activeClassName="active" exact to="/favorites"><FaHeart /> Favorites</NavLink>
                  </div>
                  <div>
                    <NavLink activeClassName="active" to="/recPlayed"><FaGitter/> Recently Played</NavLink>
                  </div>
                  <div>
                    <NavLink activeClassName="active" to="/albums" onClick={this.handleClick.bind(this)}><FaRegDotCircle/> Albums</NavLink>
                  </div>
                  <div>
                    <NavLink activeClassName="active" to="/songs"><FaMusic/> Songs</NavLink>
                  </div>
                </nav>
                </div>
                <div className="rutas">
                <Route path="/favorites" exact component={Favorites}/>
                <Route path="/recPlayed" exact component={Recent}/>
                 <Route path="/albums" component={Albums} /> 

                <Route path="/songs" component={Songs}/>
                </div>
              </Router>
              </div>
            </div>
            <div>
              <Reproductor></Reproductor>
            </div>
        </Container>
     // </div>
    )
  }
}

const mapDispatchToProps = {
  saveAlbums,
  saveSongs,
  albumSelected
};

const mapStateToProps = ({
  data
}) => ({
  data
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
