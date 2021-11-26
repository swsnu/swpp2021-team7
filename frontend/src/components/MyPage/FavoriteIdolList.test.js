import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import FavoriteIdolList from './FavoriteIdolList';



const mockStore = getMockStore({});
const IDOLS = [{ id: 1, member: 1, name: { eng: "", kor: "V" }, type: "member" }]

describe('<FavoriteIdolList />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <FavoriteIdolList idols={IDOLS}></FavoriteIdolList>
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