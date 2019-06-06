import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Album from './Album';
import { albumSelected } from '../actions/data';

class Albums extends React.PureComponent {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        albumSelected: false,
        album:{}
      }
  }
  
  handleClick(album) {
    this.setState({ album: album})
    this.props.albumSelected(true);
  }

  render () {
    return !this.props.data.albumSelected 
     ? (<Container className="info">
          {this.props.data.albums.map(album =>   
              <img className="albums" key={album.id} src={album.cover} height="200" width="200" onClick={()=>this.handleClick(album)}/>     
        )}
      </Container>
      )
     : (
     <Album album={this.state.album}></Album>
      )
  }
}

const mapDispatchToProps = {
  albumSelected
};

const mapStateToProps = ({
  data
}) => ({data});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);
