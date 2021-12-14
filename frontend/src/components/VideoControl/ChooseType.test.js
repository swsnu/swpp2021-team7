import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import ChooseType from './ChooseType';


const mockStore = getMockStore({});

describe('<ChooseType />', () => {
    let component = null
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <ChooseType
                        isView={true}
                        urlString="test"></ChooseType>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should redirect to Cut scene page', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent();

        let cutScene = component.find('button#CutScene')
        expect(cutScene.length).toBe(1)

        cutScene.simulate('click')
        expect(spyHistory).toBeCalledWith('/video/result?video=test&type=1001')

        let extractPart = component.find('button#ExtractPart')
        expect(extractPart.length).toBe(1)

        extractPart.simulate('click')
        expect(spyHistory).toBeCalledWith('/video/search?video=test&type=1002')
  
        spyHistory.mockRestore()
    })
})