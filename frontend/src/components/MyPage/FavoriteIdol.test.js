import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import FavoriteIdol from './FavoriteIdol';


const imgLink = "http://"
const name = {
    kor : "테스트",
    eng : "test"
}
const mockStore = getMockStore({});

describe('<FavoriteIdol />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <FavoriteIdol img={imgLink} name={name}></FavoriteIdol>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('ForwardRef(ListItem)')
        const listItemText = component.find('ForwardRef(ListItemText)')
        expect(listItem.length).toBe(1);
        expect(listItemText.text()).toContain(name.kor)
        expect(listItemText.text()).toContain(name.eng)
    })
    it('should redirect to Search Result Page', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent()

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)

        idolInfos.at(0).simulate('click')
        expect(spyHistory).toBeCalledWith('/search/1')

        spyHistory.mockRestore()
    })

    it('should cancel favorite idol', () => {
        const spyConsole = jest.spyOn(global.console, 'log')
        setComponent()

        let cancelBtn = component.find('ForwardRef(Button)')
        expect(cancelBtn.length).toBe(1)

        cancelBtn.first().simulate('click')
        expect(spyConsole).toBeCalledWith('cancelFavoriteIdol')

        spyConsole.mockRestore()
    })
})