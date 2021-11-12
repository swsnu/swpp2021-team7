import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Main from './Main';


const mockStore = getMockStore({});

describe('<MyPage />', () => {
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
        let searchButton = component.find('ForwardRef(Search)');
        console.log(component.debug());

        expect(searchButton.length).toBe(4);
        searchButton.simulate('click', mEvent);
        expect(mEvent.preventDefault).toBeCalledTimes(1)
    })
}) 