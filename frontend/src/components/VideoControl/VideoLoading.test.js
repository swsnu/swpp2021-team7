import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import LinearProgressWithLabel from './VideoLoading';


const mockStore = getMockStore({});

describe('<LinearProgressWithLabel />', () => {
    let component = null
    let setComponent = (isGroup) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <LinearProgressWithLabel
                    value={10}></LinearProgressWithLabel>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const label = component.find('LinearProgressWithLabel')
        
        expect(label.length).toBe(1);
        

    })
})