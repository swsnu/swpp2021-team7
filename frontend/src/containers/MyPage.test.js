import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import axiosMockAdapter from 'axios-mock-adapter';
import axios from "axios";
import MyPage from './MyPage';


const mockStore = getMockStore({});


describe('<MyPage />', () => {
    let component = null
    let axiosMock = null

    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyPage></MyPage>
                </ConnectedRouter>
            </Provider>
        )
    }

    beforeAll(() => {
        axiosMock = new axiosMockAdapter(axios);
        axiosMock.onGet('mypage/comments/').reply(200, [])
        axiosMock.onGet('mypage/idols/').reply(200, [])
        axiosMock.onGet('mypage/articles/').reply(200, [])

    })

    it('should render without errors', async () => {
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
    it('should show user info when click button', async () => {
        setComponent()
        const mEvent = { preventDefault: jest.fn() };

        let userInfo = component.find('#user-info-button')
        let userInfoBtn = userInfo.find('button')


        expect(userInfoBtn.length).toBe(1)
        userInfoBtn.simulate('click', mEvent);
        expect(mEvent.preventDefault).toBeCalledTimes(1)

        let menuItem = component.find("ForwardRef(MenuItem)").at(0)

        menuItem.simulate('click', mEvent);
        expect(component.find('MyPage').state().anchorEl).toBeNull()

    })
})