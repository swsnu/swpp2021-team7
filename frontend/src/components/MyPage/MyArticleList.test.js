import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import MyArticleList from './MyArticleList';



const mockStore = getMockStore({});
const SCRAPS = [
    { address: "http://test.com", id: 1, name: { eng: "", kor: "V" }, title: "test title", type: 'member' },
    { address: "http://test.com", id: 2, name: { eng: "", kor: "BTS" }, title: "test title", type: 'group' }

]
describe('<MyArticleList />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyArticleList scraps={SCRAPS}></MyArticleList>
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