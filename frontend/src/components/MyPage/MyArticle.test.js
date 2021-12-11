import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import axiosMockAdapter from 'axios-mock-adapter';
import axios from "axios";
import MyArticle from './MyArticle'


const TITLE = '타블로와 슬기, 빅나티, 노보가 함께한 라코스테 X 피너츠 협업 캠페인'
const ADDRESS = "http://test.com"
const TYPE = "member"
const ID = 1

const mockStore = getMockStore({});
const flushPromises = () => new Promise(setImmediate);



describe('<MyArticle />', () => {
    const { location } = window;
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyArticle
                        id={ID}
                        type={TYPE}
                        title={TITLE}
                        address={ADDRESS}></MyArticle>
                </ConnectedRouter>
            </Provider>
        )
    }

    beforeAll(() => {
        delete window.location;
        window.location = { reload: jest.fn() };
    });

    afterAll(() => {
        window.location = location;
    });

    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('ForwardRef(ListItem)')
        expect(listItem.text().includes(TITLE)).toBe(true);
    })

    it('should delete scraped article', async () => {
        let axiosMock = new axiosMockAdapter(axios)
        axiosMock
            .onDelete(`mypage/articles/${TYPE}/${ID}`)
            .reply(200, [])

        setComponent()

        let cancelBtn = component.find('ForwardRef(Button)')
        expect(cancelBtn.length).toBe(1)

        cancelBtn.first().simulate('click')
        await flushPromises()
        expect(window.location.reload).toBeCalledTimes(1)

        //error test
        const spy = jest.spyOn(global.console, "log");
        axiosMock
            .onDelete(`mypage/articles/${TYPE}/${ID}`)
            .reply(403, [])

        setComponent()
        cancelBtn.first().simulate('click')
        await flushPromises()
        expect(spy).toHaveBeenCalledWith('error occur in delete scraps');
        spy.mockRestore();

    })
})