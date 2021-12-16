import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import VideoResult from './VideoResult';
import axios from 'axios';
import { experimentalStyled } from '@mui/material';


const mockStore = getMockStore({});
const CutScene = 1001;
const FaceRecognition = 1002;

jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');
jest.mock('axios');

describe('<VideoResult />', () => {
    let component = null
    let setComponent = (location = { pathname: "/video/result" }) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <VideoResult
                        location={location}
                    ></VideoResult>
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
    it('test async functions', () => {
        setComponent()

        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();
        instance.getBySearchMemberId(2);
        const time = [12, 34, 123, 40, 102, 30, 12, 34, 65, 76, 10, 32, 67, 90];
        const data = {
            data: [{ key: 1, id: 1, thumbnail: "", info: { name: { kor: "test", eng: "test" } }, time: time },
            { key: 2, id: 2, thumbnail: "", info: { name: { kor: "test", eng: "test" } }, time: time }]
        };

        axios.get.mockImplementationOnce(() => Promise.resolve({ data: time }));
        setTimeout(() => {
            expect(instance.state.selectedIdolInfo).toEqual([]);
        }, 1200);

        instance.getVideoScene("test");
        axios.post.mockImplementationOnce(() => Promise.resolve({ data: time }));

        instance.getFaceRecognition("test");
        axios.post.mockImplementationOnce(() => Promise.resolve({ data: data }));

        instance.setSearchResult({ basicInfo: "test" });
        expect(instance.state.selectedIdolInfo).toEqual(["test"]);

        instance.setSceneResult(time);
        expect(instance.state.detectList).toEqual(time);
    })
    it('should render without errors', () => {
        setComponent()

        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();

        let timelines = VideoResult.find('Timeline');
        expect(timelines.length).toBe(1);

        instance.setState({ type: FaceRecognition });
        instance.state.selectedIdol = [1, 2];
        instance.setState({
            detectList: [
                [1, 10], [2, 10]
            ]
        });
        instance.setState({
            selectedIdolInfo: [
                { key: 1, id: 0, thumbnail: "", info: { name: { kor: "test", eng: "test" } } },
                { key: 2, id: 1, thumbnail: "", info: { name: { kor: "test", eng: "test" } } },
            ]
        });

        timelines = VideoResult.find('Timeline');
        let listItem = VideoResult.find('.test-listitem');
        setTimeout(() => {
            expect(timelines.length).toBe(1);
            expect(listItem.length).toBe(0);
        }, 1000);
    })
    it('should loader without errors', () => {
        jest.useFakeTimers();
        const Idol = [
            { key: 1, thumbnail: "", info: { name: { kor: "test", eng: "test" } } },
            { key: 2, thumbnail: "", info: { name: { kor: "test", eng: "test" } } }
        ];
        setComponent();
        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();
        //instance.state.type = 1001;

        instance.componentDidMount();
        expect(setInterval).toHaveBeenCalledTimes(2);
        expect(instance.state.progress).toEqual(10);
        jest.advanceTimersByTime(3000);
        expect(instance.state.progress).toEqual(100);
        expect(instance.state.loading).toEqual(true);
        expect(clearInterval).toHaveBeenCalledWith(1)
    });
    it('url testing 1', () => {
        const spyHistory = jest.spyOn(history, 'push')
        const location = "?type=FaceRecognition&idol=";
        global.window = { location: { pathname: "/video/result", search: "?type=" + FaceRecognition + "&idol=" } };
        setComponent()

        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();
        expect(spyHistory).toBeCalledWith('/video')
    });
    it('url testing 2', () => {
        const spyHistory = jest.spyOn(history, 'push')
        const location = {
            ...window.location,
            search: "type=" + FaceRecognition + "&idol=&video=test"
        };
        Object.defineProperty(history, 'location', {
            writable: true,
            value: location
        });

        setComponent()
        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();
        instance.componentDidMount();
        expect(spyHistory).toBeCalledWith('/video/search?video=test&type=' + FaceRecognition)
    });

    it('url testing 3', () => {
        const spyHistory = jest.spyOn(history, 'push')
        const location = {
            ...window.location,
            search: "type=" + FaceRecognition + "&idol=1,2&video=test"
        };
        Object.defineProperty(history, 'location', {
            writable: true,
            value: location
        });

        setComponent()
        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();
        instance.componentDidMount();
        expect(instance.state.selectedIdol).toEqual([1, 2]);
    });
    it('url testing 3', () => {
        const spyHistory = jest.spyOn(history, 'push')
        const location = {
            ...window.location,
            search: "type=" + CutScene + "&video=test"
        };
        Object.defineProperty(history, 'location', {
            writable: true,
            value: location
        });

        setComponent()
        const VideoResult = component.find('VideoResult');
        const instance = VideoResult.instance();
        instance.componentDidMount();

    });
})