import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import MyComment from './MyComment';


const DATE = '2021-11-08'
const CONTENT = 'Comment content'
const IDOLID = 1
const TYPE = "member"
const NAME = { kor: 'BTS', eng: "" }

const mockStore = getMockStore({});

describe('<MyComment />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyComment
                        content={CONTENT}
                        createAt={DATE}
                        type={TYPE}
                        idolId={IDOLID}
                        name={NAME}
                    ></MyComment>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('ForwardRef(ListItem)')
        console.log(listItem.text())
        expect(listItem.length).toBe(1);
        expect(listItem.text().includes(NAME.kor)).toBeTruthy()
        expect(listItem.text().includes(NAME.eng)).toBeTruthy()
        expect(listItem.text().includes(DATE)).toBeTruthy()
        expect(listItem.text().includes(CONTENT)).toBeTruthy()

    })
    it('should redirect to Search Result Page', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent()

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(2)

        idolInfos.at(0).simulate('click')
        expect(spyHistory).toBeCalledWith('/search/member/1')

        spyHistory.mockRestore()
    })
})