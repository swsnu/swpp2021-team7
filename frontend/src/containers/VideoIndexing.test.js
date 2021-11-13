import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import VideoIndexing from './VideoIndexing';


const mockStore = getMockStore({});

describe('<VideoIndexing />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <VideoIndexing></VideoIndexing>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        
        const searchIdol = component.find('SearchIdol');
        const chooseType = component.find('ChooseType');

        
        expect(searchIdol.length).toBe(1);
        expect(chooseType.length).toBe(1);

    })
})