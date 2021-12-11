import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import SearchResult from './SearchResult';

const mockStore = getMockStore({});
const name = '테스트 Test'
const id = 1

describe('<SearchResult />', () => {
    let component = null;
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <SearchResult name={name} id={id}></SearchResult>
                </ConnectedRouter>
            </Provider>
        )
    };

    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('ForwardRef(ListItem)')
        const listItemTexts = component.find('ForwardRef(ListItemText)')
        
        expect(listItem.length).toBe(1);
        expect(listItemTexts.at(0).text()).toContain(name)
    })

    it('should redirect to Search Result Page', () => {
        const spyHistory = jest.spyOn(history, 'push')

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)

        idolInfos.at(0).simulate('click');
        expect(spyHistory).toBeCalledWith('/search/group/1')

        spyHistory.mockRestore()
    })
})