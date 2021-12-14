import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import SearchIdol from './SearchIdol';


const mockStore = getMockStore({});

describe('<SearchIdol />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <SearchIdol></SearchIdol>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        
        const spyHistory = jest.spyOn(history, 'push')
        setComponent()
        const wrapper = component.find("SearchIdol");
        const instance = wrapper.instance();
        const textField = component.find('input#input-with-icon-textfield')
        expect(textField.length).toBe(1);
        const mockedEvent = { keyCode : 13, target: {}, preventDefault: () => {} }
        textField.simulate('keydown',mockedEvent);
        expect(spyHistory).toBeCalledWith('/video/search')
        spyHistory.mockRestore();

    })

    it('should render without errors', () => {
        
        const spyHistory = jest.spyOn(history, 'push')
        setComponent()
        const wrapper = component.find("SearchIdol");
        const instance = wrapper.instance();
        const textField = component.find('input#input-with-icon-textfield')
        expect(textField.length).toBe(1);
        const mockedEvent = { keyCode : 10, target: {}, preventDefault: () => {} }
        textField.simulate('keydown',mockedEvent);
        spyHistory.mockRestore();

    })

})