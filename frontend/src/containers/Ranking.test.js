import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import axiosMockAdapter from 'axios-mock-adapter';
import axios from "axios";
import Ranking from './Ranking';


const mockStore = getMockStore({});
const flushPromises = () => new Promise(setImmediate);

const TEST_DATA = [
    { id: 1, name: "TEST", type: "member", address: "12sdff" },
    { id: 1, name: "TEST1", type: "group", address: "i want jonggang" },
]


describe('<Ranking />', () => {
    let component = null
    let axiosMock = null

    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Ranking></Ranking>
                </ConnectedRouter>
            </Provider>
        )
    }

    beforeEach(() => {
        axiosMock = new axiosMockAdapter(axios);
        axiosMock.onGet('main/ranking/?page=1').reply(200, {
            idolInfos: TEST_DATA,
            lastPage: 2
        }
        )
    })
    it('should render without errors', async () => {
        setComponent()
        await flushPromises()
        component.update()
        const list = component.find('ForwardRef(List)')
        expect(list.length).toBe(1);
        const rankItem = component.find('RankItem')
        expect(rankItem.length).toBeGreaterThan(0);
    })

    it('should change page', async () => {
        setComponent()
        // await flushPromises()
        component.update()
        const pagination = component.find('ForwardRef(Pagination)')
        expect(pagination.length).toBe(1);

        const page1 = pagination.find('ForwardRef(PaginationItem)').at(1)
        expect(page1.length).toBe(1);

        page1.simulate('click')
        expect(axiosMock.handlers.get.length).toBe(1)
    })
})