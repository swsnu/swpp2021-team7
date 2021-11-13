import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import CommentInput from '../CommentInput';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore({});

describe('<CommentInput />', () => {
  let component = null;
  let setComponent = (mockSubmit) => {
    component = mount(
      <Provider store={mockStore} >
          <ConnectedRouter history={history}>
              <CommentInput addComment={mockSubmit} />
          </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
      setComponent();
      console.log(component.debug())

      const commentInput = component.find('div#comment-input');
      expect(commentInput.length).toBe(1);
  });

  it('should handle comment submit', () => {
    const mockSubmit = jest.fn();
    setComponent(mockSubmit);
    const submitBtn = component.find('#comment-submit').first();
    submitBtn.simulate('click');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});