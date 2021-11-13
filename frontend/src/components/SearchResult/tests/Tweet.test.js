import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../../test-utils/mocks';
import Tweet from "../Tweet";
import { groupDummy } from '../../../constants';

const mockStore = getMockStore({});

describe('<Tweet />', () => {
  let component = null;

  let setComponent = ({close=null, toggle=null}) => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <Tweet {...groupDummy.tweets[2]} close={close} toggle={toggle} />
          </ConnectedRouter>
      </Provider>
    )
  }

  it('should render without errors', () => {
      setComponent({});
      const tweet = component.find(".tweet");
      expect(tweet.length).toBe(1);
  });

  it('should handle image toggle', () => {
    const mockToggle = jest.fn();
    setComponent({toggle: mockToggle});
    const imageBeforeClick = component.find('img.image-before-click');
    const imageAfterClick = component.find('img.image-after-click');
    imageBeforeClick.simulate('click');
    imageAfterClick.simulate('click');
    expect(mockToggle).toHaveBeenCalledTimes(2);
  });

  it('should handle image close in backdrop', () => {
    const mockClose = jest.fn();
    setComponent({close: mockClose});
    const backdrop = component.find('.backdrop').first();
    backdrop.simulate("click");
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should toggle image open', () => {
    setComponent({});
    const imageBeforeClick = component.find('img.image-before-click');
    const imageAfterClick = component.find('img.image-after-click');
    let backdrop = component.find('.backdrop').first();

    imageBeforeClick.simulate('click');
    backdrop = component.find('.backdrop').first();
    expect(backdrop.props().open).toBe(true)

    imageAfterClick.simulate('click');
    backdrop = component.find('.backdrop').first();
    expect(backdrop.props().open).toBe(false)
});

  
});