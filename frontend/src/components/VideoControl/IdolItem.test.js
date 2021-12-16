import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import IdolItem from './IdolItem';


const mockStore = getMockStore({});

describe('<IdolItem />', () => {
    let component = null
    let setComponent = (isActive) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <IdolItem active={isActive}></IdolItem>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('#IDOL-ITEM')
        expect(listItem.length).toBe(3);
    })

    it('should redirect to Idol Item Page', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent(false)

        let not_ready_text = component.find('.not-ready-p')
        expect(not_ready_text.length).toBe(1)

        setComponent(true)

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)

        idolInfos.at(0).simulate('click')

        spyHistory.mockRestore()
    })
})