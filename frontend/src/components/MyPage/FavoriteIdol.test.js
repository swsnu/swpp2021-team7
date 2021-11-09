import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import FavoriteIdol from './FavoriteIdol';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';


const mockStore = getMockStore({});

describe('<FavoriteIdol />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <FavoriteIdol></FavoriteIdol>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        console.log(component.debug())
        const listItem = component.find('ForwardRef(ListItem)')
        expect(listItem.length).toBe(1);
    })
})