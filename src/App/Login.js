import React from 'react';

// Contexto de usuario
import UserContext from './contexts/user';

// Componente para definir rutas privadas
import PrivateRoute from './PrivateRoute';
import Admin from './Admin';
import { loginUser } from '../actions/user';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Este componente utiliza el parámetro para mostrarlo en la interfaz
class Login extends React.Component {
  constructor(props) {
    super(props);

    // Bind del método
    this.onChange = this.onChange.bind(this);

    // Inicializamos el estado
    this.state = {
      value: ""
    };

  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick = () => {
    this.props.loginUser(this.state.value);
  }

  render() {

  return (
    <UserContext.Consumer>
      {({ signedIn, updateUser }) => {
        return <div>
          { signedIn ? (
              <PrivateRoute component={Admin}/>
          ) : (
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
          )}
        </div>
      }}
    </UserContext.Consumer>)
  }
}


const mapDispatchToProps = {
  loginUser
};

export default connect(
  () => ({}),
  mapDispatchToProps,
)(Login);
