import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Tweets from '../Tweets';
import { getMockStore } from '../../../test-utils/mocks';
import { memberDummy } from '../../../constants';

const mockStore = getMockStore({});

describe('<Tweets />', () => {
  let component = null;
  let setComponent = (tweets) => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <Tweets tweets={tweets} />
          </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
      setComponent([]);
      const tweets = component.find('div#tweets');
      expect(tweets.length).toBe(1);
  });

  it('should render all tweets provided', () => {
    setComponent(memberDummy.tweets);
    const tweets = component.find('Tweet');
    expect(tweets.length).toBe(memberDummy.tweets.length);
  });
});