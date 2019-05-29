import React from 'react'; 
import { render, mount } from 'enzyme'; 
 
import Login from '../Login'; 
import { Provider } from "react-redux";
import store from '../../store';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
 
describe("Favorites", () => { 
    let wrapper; 
 
    // Inicializamos el componente en un beforeEach para    
     // evitar tener que repetir esta línea en cada test     
     beforeEach(() => {       
         wrapper = render(<Provider store={store}><Login/> </Provider>);
         }); 
 
    it('should add the HTML elements', () => {      
         // Comprobamos los distintos aspectos de HTML      
        expect(wrapper.find(Form)).toBeTruthy(); 
        expect(wrapper.find('[data-test-id="userInfo"]')).toBeDefined();
        expect(wrapper.find('[data-test-id="userPass"]')).toBeDefined();
        expect(wrapper.find(Form.Check)).toBeTruthy(); 
        expect(wrapper.find(Button)).toBeTruthy(); 
        // Comprobamos el texto boton
        expect( wrapper.find('button')[0].children[0].data).toEqual('Login')
    }); 
});