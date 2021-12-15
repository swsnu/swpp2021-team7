import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Timeline from './Timeline';


const mockStore = getMockStore({});

describe('<Timeline />', () => {
    let component = null
    const TEST = [12,34,123,40,102,30,12,34,65,76,10,32,67,90];
    const FaceRecognition = 1002;
    const CutScene = 1001;
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Timeline
                        time={TEST}
                        type={FaceRecognition}></Timeline>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const container = component.find('.timeline-container')
        const activeBox = component.find('.active-box');
        const deactiveBox = component.find('.deactive-box');
        
        expect(container.length).toBe(1);
        expect(activeBox.length).toBe(0);
        expect(deactiveBox.length).toBe(0);

    })
    let setComponent2 = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Timeline
                        time={TEST}
                        type={CutScene}></Timeline>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors for cutscene', () => {
        setComponent2()
        const container = component.find('.timeline-container')
        const activeBox = component.find('.active-box');
        const deactiveBox = component.find('.deactive-box');
        
        expect(container.length).toBe(1);
        expect(activeBox.length).toBe(7);
        expect(deactiveBox.length).toBe(7);

    })
})