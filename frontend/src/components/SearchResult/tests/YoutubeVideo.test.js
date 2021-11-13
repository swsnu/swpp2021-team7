import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import YoutubeVideo from '../YoutubeVideo';
import { memberDummy } from "../../../constants";
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore({});

describe('<YoutubeVideo />', () => {
  let component = null;
  let setComponent = (onClick) => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <YoutubeVideo {...memberDummy.youtubes[0]} onClick={onClick}></YoutubeVideo>
          </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
      setComponent();
      const youtubeVideo = component.find(".youtube-video");
      expect(youtubeVideo.length).not.toBe(0);
  })

  it('should handle click on action area', () => {
      const mockClick = jest.fn();
      setComponent(mockClick);
      const linkBtn = component.find('button.youtube-video-link');
      linkBtn.simulate('click');
      expect(mockClick).toHaveBeenCalledTimes(1);
  });
});