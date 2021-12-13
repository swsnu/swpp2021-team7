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
        expect(idolSelector.length).toBe(0);
        expect(timeline.length).toBe(1);

    })

    it('should render without errors', () => {
        setComponent()
        
        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();
        instance.state.type = 1001;

        let timelines = VideoResult.find('Timeline');
        expect(timelines.length).toBe(1);

        instance.state.type = 1002;
        instance.state.selectedIdolInfo = [
            {key : 1, thumbnail : ""},
            {key : 2, thumbnail : ""}
        ];
        timelines = VideoResult.find('Timeline');
        expect(timelines.length).toBe(1);

    })
})