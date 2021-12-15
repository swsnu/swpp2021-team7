import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Signup from './Signup';
import axios from 'axios';


const mockStore = getMockStore({});

describe('<FindAccount />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Signup></Signup>
                </ConnectedRouter>
            </Provider>
        )
    }

    it('should render without errors', () => {
        setComponent();
        const container = component.find('ForwardRef(Container)');

        expect(container.length).toBe(1);
    })

    it('should redirect to Login Page', () => {
        const spyHistory = jest.spyOn(history, 'push');
        setComponent();

        let submitButtonRef = component.find({ type: "submit" });
        let submitButton = submitButtonRef.find('ForwardRef(Button)');
        expect(submitButton.length).toBe(1);

        submitButton.at(0).simulate('submit');
        expect(spyHistory).toBeCalledWith('/sign/login');

        spyHistory.mockRestore();
    })

    it('should alert when password not same', () => {
        setComponent();
        window.alert = jest.fn();

        let passwordText = component.find('ForwardRef(TextField)').at(3);
        let passwordTextRe = component.find('ForwardRef(TextField)').at(4);
        let submitButtonRef = component.find({ type: "submit" });
        let submitButton = submitButtonRef.find('ForwardRef(Button)');

        expect(passwordText.length).toBe(1);
        expect(passwordTextRe.length).toBe(1);

        passwordText.find('input').instance().value = "1234"
        submitButton.at(0).simulate('submit');
        expect(window.alert).toHaveBeenCalledWith("Two passwords are different! Please Check");
    })
})