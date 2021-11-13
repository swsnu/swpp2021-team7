import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import VideoSearching from './VideoSearching';


const mockStore = getMockStore({});

describe('<VideoSearching />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <VideoSearching></VideoSearching>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        
        const searchIdol = component.find('SearchIdol');
        const idolItems = component.find('IdolItem');

        expect(searchIdol.length).toBe(1);
        expect(idolItems.length).toBe(4);

    })
})