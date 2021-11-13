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
  let setComponent = (isGroup) => {
    const dummy = isGroup ? groupDummy : memberDummy;
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <BasicInfo {...dummy.basicInfo} isGroup={isGroup}></BasicInfo>
          </ConnectedRouter>
      </Provider>
    )
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

  it('should color \'like\' button when user clicks it', () => {
      setComponent();

      let likeBtn = component.find('#likeBtn').first();
      likeBtn.simulate('click');
      likeBtn = component.find('#likeBtn').first();
      expect(likeBtn.props().variant).toBe("filled")
  });
});