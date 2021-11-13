import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import VideoResult from './VideoResult';


const mockStore = getMockStore({});

describe('<VideoResult />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <VideoResult></VideoResult>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        
        const youtubeVideo = component.find('YoutubeVideo');
        const idolSelector = component.find('IdolSelector');
        const timeline = component.find('Timeline');

        
        expect(youtubeVideo.length).toBe(1);
        expect(idolSelector.length).toBe(1);
        expect(timeline.length).toBe(2);

    })
})