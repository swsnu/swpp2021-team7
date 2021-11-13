import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import HotRankingList from './HotRankingList';



const mockStore = getMockStore({});

describe('<HotRankingList />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <HotRankingList></HotRankingList>
                </ConnectedRouter>
            </Provider>
        )
    }

    it('should render without errors', () => {
        setComponent();
        const listItem = component.find('ForwardRef(List)');
        expect(listItem.length).toBe(1);
    })

    it('should redirect to Rank Page', () => {
        const spyHistory = jest.spyOn(history, 'push');
        setComponent();
        
        let rankId = component.find({id:"go-rank-button"});
        let rankTitle = rankId.find('ForwardRef(Typography)');
        expect(rankTitle.length).toBe(1);

        rankTitle.at(0).simulate('click');
        expect(spyHistory).toBeCalledWith('/rank');

        spyHistory.mockRestore();
    })
})