import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Logo from '../images/cover.jpg';
import Carousel from 'react-bootstrap/Carousel'
import { FaHeart } from 'react-icons/fa';
import { FaGitter } from 'react-icons/fa';
import { FaMusic } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaRegDotCircle } from 'react-icons/fa';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './Login';
import Albums from './Albums';
import Profile from './Profile'
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
                    <h3>{album.name}</h3>
                  </Carousel.Caption>
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
            <div className="songsData">
              <div >
              <Router>
                <div className="enlaces">
                <nav>
                  <div className="enlace">
                    <NavLink activeClassName="active" to="/albums" onClick={this.handleClick.bind(this)}><FaRegDotCircle/> Albums</NavLink>
                  </div>
                  <div className="enlace">
                    <NavLink activeClassName="active" to="/songs"><FaMusic/> Songs</NavLink>
                  </div>
                  <div className="enlace">
                    <NavLink activeClassName="active" to="/recPlayed"><FaGitter/> Recently Played</NavLink>
                  </div>
                  <div className="enlace">
                      <NavLink activeClassName="active" exact to="/favorites"><FaHeart /> Favorites</NavLink>
                  </div>
                  {this.props.user.isLogged && 
                  <div className="enlace">
                    <NavLink activeClassName="active" to="/profile"><FaUser/> {this.props.user.name}</NavLink>
                  </div>}
                </nav>
                </div>
                <div className="rutas">
                  <PrivateRoute path="/favorites" exact component={Favorites}/>
                  <Route path="/recPlayed" exact component={Recent}/>
                  <Route path="/albums" component={Albums} /> 
                  <Route path="/songs" component={Songs}/>
                  <PrivateRoute path='/profile' component={Profile}/>
                </div>
                <div >
                  <Route component={Login}/>
                </div>
              </Router>
              </div>
            </div>
            <div>
              <Reproductor></Reproductor>
            </div>
        </Container>
    )
  }
}

const mapDispatchToProps = {
  saveAlbums,
  saveSongs,
  albumSelected
};

const mapStateToProps = ({
  data,user
}) => ({
  data,
  user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
