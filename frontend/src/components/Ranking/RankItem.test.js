import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import RankItem from './RankItem';


const mockStore = getMockStore({});
const rank = 1
const imgLink = 'http://'
const name = {
    kor: '테스트',
    eng: 'test'
}
const ID = 1

describe('<RankItem />', () => {
    let component = null
    let setComponent = (type) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <RankItem type={type} id={ID} rank={rank} img={imgLink} name={name}></RankItem>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent("member")
        const listItem = component.find('ForwardRef(ListItem)')
        const listItemTexts = component.find('ForwardRef(ListItemText)')
        expect(listItem.length).toBe(1);
        expect(listItemTexts.at(0).text()).toContain(rank)
        expect(listItemTexts.at(1).text()).toContain(name.eng)
        expect(listItemTexts.at(1).text()).toContain(name.eng)

    })
    it('should redirect to Search Result Page', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent("member")

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)

        idolInfos.at(0).simulate('click')
        expect(spyHistory).toBeCalledWith(`/search/member/${ID}`)

        setComponent("group")

        idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)

        idolInfos.at(0).simulate('click')
        expect(spyHistory).toBeCalledWith(`/search/group/${ID}`)

        spyHistory.mockRestore()
    })
})