import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import MyArticle from './MyArticle'


const TITLE = '타블로와 슬기, 빅나티, 노보가 함께한 라코스테 X 피너츠 협업 캠페인'
const mockStore = getMockStore({});

describe('<FavoriteIdol />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <MyArticle></MyArticle>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('ForwardRef(ListItem)')
        expect(listItem.text().includes(TITLE)).toBe(true);
    })

    it('should delete scraped article', () => {
        const spyConsole = jest.spyOn(global.console, 'log')
        setComponent()

        let cancelBtn = component.find('ForwardRef(Button)')
        expect(cancelBtn.length).toBe(1)

        cancelBtn.first().simulate('click')
        expect(spyConsole).toBeCalledWith('click deleteScrapedArticle')

        spyConsole.mockRestore()
    })
})