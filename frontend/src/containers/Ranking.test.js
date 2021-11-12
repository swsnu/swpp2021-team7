import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Ranking from './Ranking';


const mockStore = getMockStore({});


describe('<Ranking />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Ranking></Ranking>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const list = component.find('ForwardRef(List)')
        expect(list.length).toBe(1);
        const rankItem = component.find('RankItem')
        expect(rankItem.length).toBeGreaterThan(0);

    })
})