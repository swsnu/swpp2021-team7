import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import SearchResult from './SearchResult';


const mockStore = getMockStore({});

describe('<SearchResult />', () => {
    let component = null;
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <SearchResult></SearchResult>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent();
        
        const searchResult = component.find("SearchResultRoot");
        const basicInfo = component.find("BasicInfo");
        const tweets = component.find("Tweets");
        const youtube = component.find("YoutubeVideos");
        const commentInput = component.find("CommentInput");
        const comments = component.find("Comments");

        setTimeout(() => {
            expect(searchResult.length).toBe(1);
            expect(basicInfo.length).toBe(1);
            expect(tweets.length).toBe(1);
            expect(youtube.length).toBe(1);
            expect(commentInput.length).toBe(1);
            expect(comments.length).toBe(1);
        }, 1200);
    })
})