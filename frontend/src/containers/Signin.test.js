import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Signin from './Signin';
import axios from 'axios';

const mockStore = getMockStore({});

describe('<Signin />', () => {
    let component = null
    let setComponent = (testAxios) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Signin testAxios={testAxios}></Signin>
                </ConnectedRouter>
            </Provider>
        )
    }

    it('should render without errors', () => {
        setComponent();
        const container = component.find('ForwardRef(Container)');

        expect(container.length).toBe(1);
    })

    it('should redirect to Main Page', () => {
        const spyHistory = jest.spyOn(history, 'push');
        setComponent();
        
        let submitButtonRef = component.find({type:"submit"});
        let submitButton = submitButtonRef.find('ForwardRef(Button)');
        expect(submitButton.length).toBe(1);

        submitButton.at(0).simulate('submit');
        expect(spyHistory).toHaveBeenCalledTimes(0);

        spyHistory.mockRestore();
    })

    it('Alert success when login', () => {
        let mockPost = jest.spyOn(axios, 'post').mockResolvedValue({});
        window.alert = jest.fn();
        setComponent(mockPost);
        
        let submitButtonRef = component.find({type:"submit"});
        let submitButton = submitButtonRef.find('ForwardRef(Button)');
        submitButton.at(0).simulate('submit');

        expect(window.alert).toHaveBeenCalledWith("Success");
    });

    it('Alert when login fails', () => {
        let mockPost = jest.spyOn(axios, 'post').mockImplementation(() => {
            return throwError(new Error());
        });

        window.alert = jest.fn();
        setComponent(mockPost);
        
        let submitButtonRef = component.find({type:"submit"});
        let submitButton = submitButtonRef.find('ForwardRef(Button)');
        submitButton.at(0).simulate('submit');

        expect(window.alert).toHaveBeenCalledWith("Email or Password does not exist");
    })
})