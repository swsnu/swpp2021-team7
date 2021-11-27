import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import MyCommentList from './MyCommentList';



const mockStore = getMockStore({});
const COMMENTS = [
    { content: "testcontent", created_at: "2021-11-27", id: 1, member: 1, name: { eng: "", kor: "V" }, type: "member" },
    { content: "testcontent2", created_at: "2021-11-27", id: 1, group: 1, name: { eng: "", kor: "BTS" }, type: "group" }
]

describe('<MyCommentList />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyCommentList comments={COMMENTS}></MyCommentList>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('ForwardRef(List)')
        expect(listItem.length).toBe(1);
    })

})