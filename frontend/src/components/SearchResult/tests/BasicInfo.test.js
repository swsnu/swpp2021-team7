import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import BasicInfo from '../BasicInfo';
import { groupDummy, memberDummy } from "../../../constants";
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore({});

describe('<BasicInfo />', () => {
  let component = null;
  let setComponent = (isGroup, toggleLike, toggleScrap) => {
    const dummy = isGroup ? groupDummy : memberDummy;
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <BasicInfo {...dummy.basicInfo} isGroup={isGroup} loadedScraps={["scrap1", "scrap2"]} toggleLikeAsProp={toggleLike} toggleScrapAsProp={toggleScrap}></BasicInfo>
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
})

  it("should call toggleLike when click like button", () => {
    const toggleLike = jest.fn(() => null);
    setComponent(true, toggleLike);
    let likeBtn = component.find('#likeBtn').first();
    likeBtn.simulate('click');
    expect(toggleLike.mock.calls.length).toBe(1)
  });

  it("should call toggleScrap when click scrap button", () => {
    const toggleScrap = jest.fn(() => null )
    setComponent(true, null, toggleScrap);
    let scrapBtn = component.find("button.scrap").first();
    scrapBtn.simulate('click');
    expect(toggleScrap.mock.calls.length).toBe(1)
  });
});