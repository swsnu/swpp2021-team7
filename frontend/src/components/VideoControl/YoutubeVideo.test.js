import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import YoutubeVideo from './YoutubeVideo';


const mockStore = getMockStore({});

describe('<YoutubeVideo />', () => {
    let component = null
    let setComponent = (isGroup) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <YoutubeVideo></YoutubeVideo>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const youtube = component.find('YouTube')
        
        expect(youtube.length).toBe(1);
        

    })
})