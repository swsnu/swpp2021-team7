import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import BasicInfo from '../BasicInfo';
import { groupDummy, memberDummy } from "../../../constants";
import { getMockStore } from '../../../test-utils/mocks';
import axios from 'axios';

const mockStore = getMockStore({});

describe('<BasicInfo />', () => {
  let component = null;

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  let setComponent = (isGroup, isLoggedIn=true, isLoading=false) => {
    const dummy = isGroup ? groupDummy : memberDummy;
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <BasicInfo {...dummy.basicInfo} isLoggedIn={isLoggedIn} defaultLoading={isLoading} isGroup={isGroup} loadedScraps={["scrap1", "scrap2"]}></BasicInfo>
          </ConnectedRouter>
      </Provider>
    );
  }
  it('should render without errors', () => {
      setComponent(false);
      const basicInfo = component.find("#basicInfo");
      expect(basicInfo.length).toBe(1);
  })

  it("should render members if isGroup is true", () => {
    setComponent(true);
    const members = component.find("#members");
    expect(members.length).toBe(1);
  });

  it("should call toggleLike when click like button", () => {
    const toggleLike = jest.spyOn(axios, 'post').mockResolvedValue({})
    setComponent(true);
    let likeBtn = component.find('#likeBtn').first();
    likeBtn.simulate('click');
    expect(toggleLike).toBeCalledTimes(1);
  });

  it("should call toggleScrap when click scrap button", () => {
    const toggleScrap = jest.spyOn(axios, 'post').mockResolvedValue({})
    setComponent(true);
    let scrapBtn = component.find("button.scrap").first();
    scrapBtn.simulate('click');
    expect(toggleScrap).toBeCalledTimes(1);
  });

  it("should block like when not logged in", () => {
    window.alert = jest.fn();
    setComponent(true, false);
    let likeBtn = component.find("#likeBtn").first();
    likeBtn.simulate('click');
    expect(window.alert).toHaveBeenCalledWith("Please log in!");
  });

  it("should block scrap when not logged in", () => {
    window.alert = jest.fn();
    setComponent(true, false);
    let scrapBtn = component.find("button.scrap").first();
    scrapBtn.simulate('click');
    expect(window.alert).toHaveBeenCalledWith("Please log in!");
  });

  it("should block like when loading", () => {
    window.alert = jest.fn();
    setComponent(true, true, true);
    let likeBtn = component.find("#likeBtn").first();
    likeBtn.simulate('click');
    expect(window.alert).toHaveBeenCalledWith("Your last request is in progress!");
  });

  it("should block scrap when loading", () => {
    window.alert = jest.fn();
    setComponent(true, true, true);
    let scrapBtn = component.find("button.scrap").first();
    scrapBtn.simulate('click');
    expect(window.alert).toHaveBeenCalledWith("Your last request is in progress!");
  });

  // it("should set loading false when scrap finishes", () => {
  //   setComponent(true);
  //   let scrapBtn = component.find("button.scrap").first();
  //   scrapBtn.simulate('click');
  //   expect(setState).toHaveBeenCalledWith(false);
  // });
});