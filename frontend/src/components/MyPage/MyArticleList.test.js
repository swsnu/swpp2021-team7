import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import MyArticleList from './MyArticleList';



const mockStore = getMockStore({});

describe('<MyArticleList />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyArticleList></MyArticleList>
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