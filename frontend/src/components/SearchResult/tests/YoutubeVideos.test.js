import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import YoutubeVideos from '../YoutubeVideos';
import { getMockStore } from '../../../test-utils/mocks';
import { memberDummy } from '../../../constants';

const mockStore = getMockStore({});

describe('<YoutubeVideos />', () => {
  let component = null;
  let setComponent = () => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <YoutubeVideos videos={memberDummy.youtubes} />
          </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
      setComponent();
      const youtubeVideos = component.find('div#youtube-videos');
      expect(youtubeVideos.length).toBe(1);
  });
});