import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import SharedVideo from '../SharedVideo';
import { memberDummy } from "../../../constants";
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore({});

describe('<SharedVideo />', () => {
  let component = null;
  let setComponent = (onClick) => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <SharedVideo {...memberDummy.shared[0]} onClick={onClick}></SharedVideo>
          </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
      setComponent();
      const sharedVideo = component.find(".shared-video");
      expect(sharedVideo.length).not.toBe(0);
  })

  it('should handle click on action area', () => {
      const mockClick = jest.fn();
      setComponent(mockClick);
      const linkBtn = component.find('button.shared-video-link');
      linkBtn.simulate('click');
      expect(mockClick).toHaveBeenCalledTimes(1);
  });
});