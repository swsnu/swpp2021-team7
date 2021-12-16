import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import VideoSearching from './VideoSearching';


const mockStore = getMockStore({});

jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');
jest.mock('axios');

describe('<VideoSearching />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <VideoSearching testing={true}></VideoSearching>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        
        const searchIdol = component.find('SearchIdol');
        const idolItems = component.find('IdolItem');

        expect(searchIdol.length).toBe(1);
        expect(idolItems.length).toBe(1);

    })
    it('should nextstap working without error', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent()
        
        const wrapper = component.find("VideoSearching");
        let instance = wrapper.instance();
        instance.setState({selectedIdol:[
            {key : 1, id : 0, thumbnail : "", name : {kor : "test",eng : "test"}},
            {key : 2, id : 1, thumbnail : "", name : {kor : "test",eng : "test"}},
        ]})
        instance.componentDidMount();
        let button  = wrapper.find("button.TEST-BUTTON");
        button.simulate('click');
        
        expect(spyHistory).toBeCalledWith('/video')

    })
    it('should nextstap working without error2', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent()
        
        const wrapper = component.find("VideoSearching");
        let instance = wrapper.instance();
        instance.componentDidMount();
        instance.setState({selectedIdol:[
            {key : 1, id : 0, thumbnail : "", name : {kor : "test",eng : "test"}},
            {key : 2, id : 1, thumbnail : "", name : {kor : "test",eng : "test"}},
        ]})
        instance.setState({video:"test"});
        
        let button  = wrapper.find("button.TEST-BUTTON");
        button.simulate('click');
        
        expect(spyHistory).toBeCalledWith('/video/result?video=test&type=1002&idol=0,1,')

    })

    it('should loader without errors', () => {
        jest.useFakeTimers();
        const Idol = [
            {key : 1, thumbnail : "", name : {kor:"test",eng:"test"}},
            {key : 2, thumbnail : "", name : {kor:"test",eng:"test"}}
        ];
        setComponent();
        const wrapper = component.find('VideoSearching');
        const instance = wrapper.instance();
        //instance.state.type = 1001;
        
        instance.componentDidMount();
        expect(setInterval).toHaveBeenCalledTimes(2);
        expect(instance.state.progress).toEqual(10);
        jest.advanceTimersByTime(1000);
        expect(instance.state.progress).toEqual(10);
        expect(instance.state.loading).toEqual(false);
        let called = instance.handlingLoad()
        expect(clearInterval).toHaveBeenCalledWith(1)
    });
    it('test async functions',  ()=>{
        setComponent()
        
        const wrapper = component.find('VideoSearching');
        const instance = wrapper.instance();
        instance.getBySearchKeyword("test");
        const data = {
            data: [{key : 1, id : 1, thumbnail : "", name : {kor : "test",eng : "test"}},
            {key : 2, id : 2, thumbnail : "", name : {kor : "test",eng : "test"}},]
          };
      
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        setTimeout(() => {
            expect(instance.state.selectedIdolInfo).toEqual([]);
        },1200);

    })
    it('test handleIdols', () => {
        setComponent()
        
        const wrapper = component.find('VideoSearching');
        const instance = wrapper.instance();
        instance.setState({selectedIdol:[
            {key : 1, hasModel:true, id : 0, thumbnail : "", name : {kor : "test",eng : "test"}},
            {key : 2, hasModel:false, id : 1, thumbnail : "", name : {kor : "test",eng : "test"}},
        ]})
        instance.handleIdols({
            key : 3, hasModel:true, id : 2, thumbnail : "", name : {kor : "test",eng : "test"}
        });
        expect(instance.state.selectedIdol).toEqual([
            {key : 1, hasModel:true, id : 0, thumbnail : "", name : {kor : "test",eng : "test"}},
            {key : 2, hasModel:false, id : 1, thumbnail : "", name : {kor : "test",eng : "test"}},
            {key : 3, hasModel:true, id : 2, thumbnail : "", name : {kor : "test",eng : "test"}}
        ]
        );

        instance.handleIdols({
            key : 3, hasModel:false, id : 2, thumbnail : "", name : {kor : "test",eng : "test"}
        });
        expect(instance.state.selectedIdol).toEqual([
            {key : 1, hasModel:true, id : 0, thumbnail : "", name : {kor : "test",eng : "test"}},
            {key : 2, hasModel:false, id : 1, thumbnail : "", name : {kor : "test",eng : "test"}},
            
        ]
        );
        instance.handleDelete({
            key : 1, hasModel:true, id : 0, thumbnail : "", name : {kor : "test",eng : "test"}
        });
        expect(instance.state.selectedIdol).toEqual([
            {key : 1, hasModel:true, id : 0, thumbnail : "", name : {kor : "test",eng : "test"}},
        ]
        );
    });
    it('other functions',() => {
        setComponent()
        
        const wrapper = component.find('VideoSearching');
        const instance = wrapper.instance();
        instance.setSearchResult([]);
        expect(instance.state.searchResult).toEqual([]);

        instance.searchQuery({target:{value:"test"}});
        expect(instance.state.query).toEqual("test");
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        instance.handleSubmit(fakeEvent);
        expect(instance.state.submitDone).toEqual(true);
    });
})