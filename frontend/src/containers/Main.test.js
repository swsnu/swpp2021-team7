import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Main from './Main';
import axios from 'axios';

const mockStore = getMockStore({});

describe('<Main />', () => {
    let component = null
    let setComponent = (testAxios=null) => {
        component = mount(
            <Provider store={mockStore} >
                <ConnectedRouter history={history}>
                    <Main isTest={true} testAxios={testAxios}></Main>
                </ConnectedRouter>
            </Provider>
        )
    }
    it('should render without errors', () => {
        setComponent()
        const container = component.find({component: "main"});
        expect(container.length).toBe(1);
    })

    it('should show search result when click button', () => {
        setComponent()
        const mEvent = { preventDefault: jest.fn() };
        let searchButtonId = component.find({id: 'search-button'});
        let searchButton = searchButtonId.find('MuiSvgIconRoot');
        
        expect(searchButton.length).toBe(1);
        searchButton.simulate('submit', mEvent);
        // console.log(mEvent.preventDefault);
        expect(mEvent.preventDefault).toBeCalledTimes(1)
    });

    it("should call getbysearchkeyword when click button", () => {
        let mockAxios = jest.spyOn(axios, 'get').mockResolvedValue({data: []});
        window.alert = jest.fn();
        setComponent(mockAxios);

        const mEvent = { preventDefault: jest.fn() };
        let searchButtonId = component.find({id: 'search-button'});
        let searchButton = searchButtonId.find('MuiSvgIconRoot');
        
        searchButton.simulate('submit', mEvent);

        expect(mockAxios).toHaveBeenCalledTimes(2);
        expect(window.alert).toHaveBeenCalledWith("Searched");
    });

    it("should alert when getbysearchkeyword fails", () => {
        let mockAxios = jest.spyOn(axios, 'get').mockImplementation(() => {
            return throwError(new Error());
        });
        window.alert = jest.fn();
        setComponent(mockAxios);

        const mEvent = { preventDefault: jest.fn() };
        let searchButtonId = component.find({id: 'search-button'});
        let searchButton = searchButtonId.find('MuiSvgIconRoot');
        
        searchButton.simulate('submit', mEvent);

        expect(mockAxios).toHaveBeenCalledTimes(2);
        expect(window.alert).toHaveBeenCalledWith("Search failed");
    });

    it("should call idol request when click request button", () => {
        let mockPost = jest.spyOn(axios, 'post').mockResolvedValue({});
        window.alert = jest.fn();
        setComponent(mockPost);

        const mEvent = { preventDefault: jest.fn() };
        let searchButtonId = component.find({id: 'search-button'});
        let searchButton = searchButtonId.find('MuiSvgIconRoot');
        
        searchButton.simulate('submit', mEvent);

        let requestBtn = component.find("#requestBtn").first();
        requestBtn.simulate('click');
        expect(mockPost).toHaveBeenCalledTimes(2);
        expect(window.alert).toHaveBeenCalledWith("Successfully submitted. We would make [test] available shortly.");
    });

    it("should alert when request failed", () => {
        let mockPost = jest.spyOn(axios, 'post').mockImplementation(() => {
            return throwError(new Error());
        });
        window.alert = jest.fn();
        setComponent(mockPost);

        const mEvent = { preventDefault: jest.fn() };
        let searchButtonId = component.find({id: 'search-button'});
        let searchButton = searchButtonId.find('MuiSvgIconRoot');
        
        searchButton.simulate('submit', mEvent);

        let requestBtn = component.find("#requestBtn").first();
        requestBtn.simulate('click');
        expect(mockPost).toHaveBeenCalledTimes(2);
        expect(window.alert).toHaveBeenCalledWith("Excessive requests in short time. Request again after a while.");
    });
}) 