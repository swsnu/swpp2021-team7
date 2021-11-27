import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import axiosMockAdapter from 'axios-mock-adapter';
import axios from "axios";
import FavoriteIdol from './FavoriteIdol';


const imgLink = "http://"
const name = {
    kor: "테스트",
    eng: "test"
}
const ID = 1
const IDOLID = 1

const mockStore = getMockStore({});
const flushPromises = () => new Promise(setImmediate);


describe('<FavoriteIdol />', () => {
    const { location } = window;
    let component = null
    let setComponent = (type) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <FavoriteIdol
                        img={imgLink}
                        type={type}
                        id={ID}
                        idolId={IDOLID}
                        name={name}></FavoriteIdol>
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
        setComponent("member")
        const listItem = component.find('ForwardRef(ListItem)')
        const listItemText = component.find('ForwardRef(ListItemText)')
        expect(listItem.length).toBe(1);
        expect(listItemText.text()).toContain(name.kor)
        expect(listItemText.text()).toContain(name.eng)
    })
    it('should redirect to Search Result Page', () => {
        const spyHistory = jest.spyOn(history, 'push')

        let type = "group"
        setComponent(type)

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)
        idolInfos.at(0).simulate('click')
        expect(spyHistory).toBeCalledWith(`/search/${type}/${IDOLID}`)

        setComponent("member")
        type = "member"
        idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)
        idolInfos.at(0).simulate('click')
        expect(spyHistory).toBeCalledWith(`/search/${type}/${IDOLID}`)

        spyHistory.mockRestore()
    })

    it('should cancel favorite idol', async () => {
        let type = "member"
        let axiosMock = new axiosMockAdapter(axios)
        axiosMock
            .onDelete(`mypage/idols/${type}/${ID}/`)
            .reply(200, [])

        setComponent(type)

        let cancelBtn = component.find('ForwardRef(Button)')
        expect(cancelBtn.length).toBe(1)

        cancelBtn.first().simulate('click')
        await flushPromises()
        expect(window.location.reload).toBeCalledTimes(1)

        //error test
        const spy = jest.spyOn(global.console, "log");
        axiosMock
            .onDelete(`mypage/idols/${type}/${ID}/`)
            .reply(403, [])

        setComponent()
        cancelBtn.first().simulate('click')
        await flushPromises()
        expect(spy).toHaveBeenCalledWith('error occur in delete favorite idol');
        spy.mockRestore();

    })
})