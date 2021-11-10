import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import FavoriteIdol from './FavoriteIdol';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';


const mockStore = getMockStore({});

describe('<FavoriteIdol />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <FavoriteIdol></FavoriteIdol>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('ForwardRef(ListItem)')
        expect(listItem.length).toBe(1);
    })
    it('should redirect to Search Result Page', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent()

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(2)

        idolInfos.at(0).simulate('click')
        expect(spyHistory).toBeCalledWith('/search/1')

        idolInfos.at(1).simulate('click')
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