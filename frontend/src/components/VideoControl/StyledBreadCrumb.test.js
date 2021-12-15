import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import StyledBreadcrumb from './StyledBreadCrumb';
import SafetyDividerOutlinedIcon from '@mui/icons-material/SafetyDividerOutlined';

const mockStore = getMockStore({});

describe('<StyledBreadcrumb />', () => {
    let component = null
    const TEST = <SafetyDividerOutlinedIcon fontSize="small"/>;
    const label = "test";
    let setComponent = () => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <StyledBreadcrumb
                        icon={TEST}
                        label={label}></StyledBreadcrumb>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const container = component.find('StyledBreadcrumb')
        
        expect(container.length).toBe(1);
    })
})