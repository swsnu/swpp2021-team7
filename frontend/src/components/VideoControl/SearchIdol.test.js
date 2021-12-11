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
        const textField = component.find('input#input-with-icon-textfield')
        expect(textField.length).toBe(1);
        
        //textField.simulate('keydown', {keyCode: 13});
        textField.simulate('keydown');
        // expect(spyHistory).toBeCalledWith('/video/search')
        expect(spyHistory).toHaveBeenCalledTimes(0);
        spyHistory.mockRestore();

    })

})