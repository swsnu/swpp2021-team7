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
    it('input string validation matchYoutubeUrl', ()  => {

        setComponent();

        const searchIdol = component.find('SearchIdol');
        const input = searchIdol.find('input');
        const wrapper = component.find('VideoIndexing');
        const instance = wrapper.instance();
        let test = instance.matchYoutubeUrl("test");
    
        expect(test).toEqual(false);

        test = instance.matchYoutubeUrl("https://www.youtube.com/watch?v=pBuZEGYXA6E");
        expect(test).toEqual("pBuZEGYXA6E");

        test = instance.getParameterByName('v',"https://www.youtube.com/watch?v=pBuZEGYXA6E");
        expect(test).toEqual("pBuZEGYXA6E");

        test = instance.getParameterByName('v',"https://www.youtube.com/watch?");
        expect(test).toEqual(null);

        test = instance.getParameterByName('v');
        expect(test).toEqual(null);

        test = instance.getParameterByName('v',"https://www.youtube.com/watch?v=");
        expect(test).toEqual("");
        
    })
    it('input string validation matchYoutubeUrl', ()  => {

        setComponent();
        
        const wrapper = component.find('VideoIndexing');
        const instance = wrapper.instance();
        const input = wrapper.find('input');
        const input_instance = input.instance();
        input_instance.value = "test";
        input.simulate('change', { target: { value: 'Hello' } })
        expect(instance.state["url"]).toEqual(false);

        input.simulate('change', { target: { value: 'https://www.youtube.com/watch?v=pBuZEGYXA6E' } })
        expect(instance.state["url"]).toEqual("pBuZEGYXA6E");

        input.simulate('change', { target: { value: 'https://www.youtube.com/watch' } })
        expect(instance.state["url"]).toEqual(false);
    })
})