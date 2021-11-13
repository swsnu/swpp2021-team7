import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import IdolSelector from './IdolSelector';


const mockStore = getMockStore({});

describe('<IdolSelector />', () => {
    let component = null
    let setComponent = (isGroup) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <IdolSelector></IdolSelector>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('div.idol-image')
        expect(listItem.length).toBe(2);

    })

})