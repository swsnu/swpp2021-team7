import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Comments from '../Comments';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore({});

describe('<Comments />', () => {
  let component = null;
  let setComponent = (comments) => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <Comments comments={comments} />
          </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
      setComponent([]);
      const comments = component.find('div#comments');
      expect(comments.length).toBe(1);
  });

  it('should render all comments provided', () => {
    const dummyComments = [{author: "test", content: "test", timestamp: "just now", isMine: false},
                            {author: "test2", content: "test2", timestamp: "just now", isMine: false}];
    setComponent(dummyComments);
    const comments = component.find('Comment');
    expect(comments.length).toBe(dummyComments.length);
});
});