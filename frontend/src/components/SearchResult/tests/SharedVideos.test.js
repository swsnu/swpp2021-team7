import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import SharedVideos from '../SharedVideos';
import { getMockStore } from '../../../test-utils/mocks';
import { memberDummy } from '../../../constants';

const mockStore = getMockStore({});

describe('<SharedVideos />', () => {
  let component = null;
  let setComponent = () => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <SharedVideos videos={memberDummy.shared} />
          </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
      setComponent();
      const sharedVideos = component.find('div#shared-videos');
      expect(sharedVideos.length).toBe(1);
  });
});