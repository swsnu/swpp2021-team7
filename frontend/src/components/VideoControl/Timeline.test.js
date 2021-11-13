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
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Timeline></Timeline>
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
        expect(activeBox.length).toBe(7);
        expect(deactiveBox.length).toBe(7);

    })
})