import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Header from './Header';


const mockStore = getMockStore({});
const logout = 'Logout'
const mypage = 'MyPage'
const main = 'Main'

describe('<Header />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Header></Header>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const tabs = component.find('ForwardRef(Tab)')
        expect(tabs.length).toBe(3);
        expect(tabs.at(0).text()).toContain(logout)
        expect(tabs.at(1).text()).toContain(mypage)
        expect(tabs.at(2).text()).toContain(main)

    })
    it('should redirect to according headers', () => {
        setComponent()
        const spyHistory = jest.spyOn(history, 'push')
        const tabs = component.find('ForwardRef(Tab)')
        let logoutTab = tabs.at(0)
        let mypageTab = tabs.at(1)
        let mainTab = tabs.at(2)

        logoutTab.simulate('click')
        expect(spyHistory).toBeCalledWith(logoutTab.props().value)

        mypageTab.simulate('click')
        expect(spyHistory).toBeCalledWith(mypageTab.props().value)

        mainTab.simulate('click')
        expect(spyHistory).toBeCalledWith(mainTab.props().value)

        spyHistory.mockRestore()
    })
})