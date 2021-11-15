import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Main from './Main';

const mockStore = getMockStore({});

describe('<Main />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Main></Main>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const container = component.find({component: "main"});
        expect(container.length).toBe(1);
    })

    it('should show user info when click button', () => {
        setComponent()
        const mEvent = { preventDefault: jest.fn() };
        let searchButtonId = component.find({id: 'search-button'});
        let searchButton = searchButtonId.find('MuiSvgIconRoot');
        
        expect(searchButton.length).toBe(1);
        searchButton.simulate('submit', mEvent);
        console.log(mEvent.preventDefault);
        expect(mEvent.preventDefault).toBeCalledTimes(1)
    })
}) 