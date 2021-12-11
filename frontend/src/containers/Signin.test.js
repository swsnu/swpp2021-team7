import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Signin from './Signin';

const mockStore = getMockStore({});
const mockEvent = {currentTarget: {email: "test@test.test", password: "test"}};


describe('<FindAccount />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Signin></Signin>
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
})