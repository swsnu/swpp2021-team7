import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import CommentInput from '../CommentInput';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore({});
const flushPromises = () => new Promise(setImmediate);


describe('<CommentInput />', () => {
  let component = null;
  let setComponent = (mockReload, isGroup) => {
    component = mount(
      <Provider store={mockStore} >
        <ConnectedRouter history={history}>
          <CommentInput id={1} isLoggedIn={true} defaultInput="test" isGroup={isGroup} setReload={mockReload} reload={false} />
        </ConnectedRouter>
      </Provider>
    )
  }
  it('should render without errors', () => {
    setComponent();
    const commentInput = component.find('div#comment-input');
    expect(commentInput.length).toBe(1);
  });

  it('should handle comment submit(member)', async () => {
    const mockPost = jest.spyOn(axios, 'post').mockResolvedValue({})
    const mockReload = jest.fn();
    setComponent(mockReload, false);
    const submitBtn = component.find('#comment-submit').first();
    submitBtn.simulate('click');
    await flushPromises()

    expect(mockPost).toBeCalledTimes(1);
    expect(mockReload).toHaveBeenCalledTimes(1);

    mockPost.mockRestore()
  });

  it('should handle comment submit(group)', async () => {
    const mockPost = jest.spyOn(axios, 'post').mockResolvedValue({})
    const mockReload = jest.fn();
    setComponent(mockReload, true);
    const submitBtn = component.find('#comment-submit').first();
    submitBtn.simulate('click');
    await flushPromises()

    expect(mockPost).toBeCalledTimes(1);
    expect(mockReload).toHaveBeenCalledTimes(1);

    mockPost.mockRestore()
  });

  it('should change value when text filled', async () => {
    setComponent({}, false);
    const textField = component.find('ForwardRef(TextField)');
    textField.simulate('change', { target: { value: "test" } });

    expect(textField.props().value).toEqual("test")
  });
});