import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import IdolItem from './IdolItem';
import axios from 'axios';


const mockStore = getMockStore({});

describe('<IdolItem />', () => {
    let component = null
    let setComponent = (isActive, testPost=null) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <IdolItem active={isActive} testPost={testPost} name="test"></IdolItem>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const listItem = component.find('#IDOL-ITEM')
        expect(listItem.length).toBe(3);
    })

    it('should redirect to Idol Item Page', () => {
        const spyHistory = jest.spyOn(history, 'push')
        setComponent(false)

        let not_ready_text = component.find('.not-ready-p')
        expect(not_ready_text.length).toBe(1)

        setComponent(true)

        let idolInfos = component.find('ForwardRef(Chip)')
        expect(idolInfos.length).toBe(1)

        idolInfos.at(0).simulate('click')

        spyHistory.mockRestore()
    });

    it("should call idol request when click button", () => {
        let mockPost = jest.spyOn(axios, 'post').mockResolvedValue({});
        window.alert = jest.fn();
        setComponent(false, mockPost);
        let requestBtn = component.find("#requestBtn").first();
        requestBtn.simulate('click');
        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Successfully submitted. We would make [test] available shortly.");
    });

    it("should alert when request failed", () => {
        let mockPost = jest.spyOn(axios, 'post').mockImplementation(() => {
            return throwError(new Error());
        });
        window.alert = jest.fn();
        setComponent(false, mockPost);
        let requestBtn = component.find("#requestBtn").first();
        requestBtn.simulate('click');
        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Excessive requests in short time. Request again after a while.");
    });
})