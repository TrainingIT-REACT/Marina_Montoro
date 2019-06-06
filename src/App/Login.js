import React from 'react';

// Contexto de usuario
import UserContext from './contexts/user';
import { loginUser, logged } from '../actions/user';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Este componente utiliza el parámetro para mostrarlo en la interfaz
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: ""
    };
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick = () => {
    this.props.loginUser(this.state.value);
    this.props.logged(true);
  }

  render() {

    return (
      <UserContext.Consumer>
        {({ signedIn, updateUser }) => {
          return <div>
                <div className="private">
                {!signedIn && this.props.location.state && this.props.location.state.message &&
                  <p>
                    { this.props.location.state.message }
                  </p>}
                </div>
                {!signedIn &&
                  <div className="login">
                    <Form>
                      <Form.Group>
                        <Form.Label >User name</Form.Label>
                        <Form.Control id="userName" type="text" placeholder="Enter user" value={this.state.value} onChange={this.onChange} maxLength="13"/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label id="userPass">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group>
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <Button variant="primary" onClick={() => {updateUser(true); this.handleClick()}}>
                        Login
                      </Button>
                    </Form> 
                  </div>
                }
              </div>        
        }}
    </UserContext.Consumer>)
  }
}

const mapDispatchToProps = {
  loginUser,
  logged
};

export default connect(
  () => ({}),
  mapDispatchToProps,
)(Login);
