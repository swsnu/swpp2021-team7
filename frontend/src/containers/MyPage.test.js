import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import MyPage from './MyPage';


const mockStore = getMockStore({});

describe('<MyPage />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyPage></MyPage>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const menu = component.find('ForwardRef(Menu)')
        const favoriteIdolList = component.find('FavoriteIdolList')
        const myCommentList = component.find('MyCommentList')
        const myArticleList = component.find('MyArticleList')

        expect(menu.length).toBe(1);
        expect(favoriteIdolList.length).toBe(1);
        expect(myCommentList.length).toBe(1);
        expect(myArticleList.length).toBe(1);

    })
    it('should show user info when click button', () => {
        setComponent()
        const mEvent = { preventDefault: jest.fn() };

        let userInfo = component.find('#user-info-button')
        let userInfoBtn = userInfo.find('button')

        expect(userInfoBtn.length).toBe(1)

        userInfoBtn.simulate('click', mEvent);
        expect(mEvent.preventDefault).toBeCalledTimes(1)
    })
})