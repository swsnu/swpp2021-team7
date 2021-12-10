import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import Comments from '../Comments';
import axios from 'axios';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore({});

describe('<Comments />', () => {
  let component = null;
  let setComponent = (comments, isGroup = false) => {
    component = mount(
      <Provider store={mockStore} >
        <ConnectedRouter history={history}>
          <Comments comments={comments} isGroup={isGroup} />
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
    const dummyComments = [{ author: "test", content: "test", created_at: "just now", isMine: false },
    { author: "test2", content: "test2", created_at: "just now", isMine: false }];
    setComponent(dummyComments);
    const comments = component.find('Comment');
    expect(comments.length).toBe(dummyComments.length);
  });

  it('should call updateCmt function when click update button(member)', () => {
    const mockPut = jest.spyOn(axios, 'put').mockResolvedValue({})
    const dummyComments = [{ author: "test", content: "test", created_at: "just now", isMine: true },];
    setComponent(dummyComments);
    const comment = component.find('Comment').at(0);
    const chips = comment.find('.edit-or-delete').find('ForwardRef(Chip)')
    const updateChip = chips.at(0)

    expect(chips.length).toBe(2);

    updateChip.simulate('click')
    updateChip.simulate('click')
    expect(mockPut).toBeCalledTimes(1);

    mockPut.mockRestore()
  });

  it('should call updateCmt function when click update button(group)', () => {
    const mockPut = jest.spyOn(axios, 'put').mockResolvedValue({})
    const dummyComments = [{ author: "test", content: "test", created_at: "just now", isMine: true },];
    setComponent(dummyComments, true);
    const comment = component.find('Comment').at(0);
    const chips = comment.find('.edit-or-delete').find('ForwardRef(Chip)')
    const updateChip = chips.at(0)

    expect(chips.length).toBe(2);

    updateChip.simulate('click')
    updateChip.simulate('click')
    expect(mockPut).toBeCalledTimes(1);

    mockPut.mockRestore()
  });

  it('should call deleteCmt function when click delete button(member)', () => {
    const mockDelete = jest.spyOn(axios, 'delete').mockResolvedValue({})
    const dummyComments = [{ author: "test", content: "test", created_at: "just now", isMine: true },];
    setComponent(dummyComments);
    const comment = component.find('Comment').at(0);
    const chips = comment.find('.edit-or-delete').find('ForwardRef(Chip)')
    const deleteChip = chips.at(1)

    expect(chips.length).toBe(2);

    deleteChip.simulate('click')
    expect(mockDelete).toBeCalledTimes(1);

    mockDelete.mockRestore()
  });

  it('should call deleteCmt function when click delete button(group)', () => {
    const mockDelete = jest.spyOn(axios, 'delete').mockResolvedValue({})
    const dummyComments = [{ author: "test", content: "test", created_at: "just now", isMine: true },];
    setComponent(dummyComments, true);
    const comment = component.find('Comment').at(0);
    const chips = comment.find('.edit-or-delete').find('ForwardRef(Chip)')
    const deleteChip = chips.at(1)

    expect(chips.length).toBe(2);

    deleteChip.simulate('click')
    expect(mockDelete).toBeCalledTimes(1);

    mockDelete.mockRestore()
  });
});