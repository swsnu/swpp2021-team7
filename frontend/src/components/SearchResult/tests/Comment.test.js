import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';;
import { history } from '../../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../../test-utils/mocks';
import Comment from "../Comment";

const mockStore = getMockStore({});

describe('<Comment />', () => {
  let component = null;
  let dummyComment = { author: "test", content: "content", timestamp: "1 minute ago" };

  let setComponent = (isMine, updateCmt = {}, deleteCmt = {}) => {
    component = mount(
      <Provider store={mockStore} >
        <ConnectedRouter history={history}>
          <Comment {...dummyComment} isMine={isMine} updateCmt={updateCmt} deleteCmt={deleteCmt} />
        </ConnectedRouter>
      </Provider>
    )
  }

  it('should render without errors', () => {
    setComponent(false);
    const comment = component.find(".comment");
    expect(comment.length).toBe(1);
  });

  it("should render edit/delete button if isMine is true", () => {
    setComponent(true);
    let editOrDelete = component.find(".edit-or-delete");
    expect(editOrDelete.length).toBe(1);
  });

  it("should render Input if edit is clicked", () => {
    const updateCmt = jest.fn((id, value) => { return null })
    setComponent(true, updateCmt);

    let editOrDelete = component.find(".edit-or-delete");
    let editBtn = editOrDelete.find("ForwardRef(Chip)").first()
    editBtn.simulate('click');
    let input = component.find("ForwardRef(Input)")
    expect(input.length).toBe(1);

    editBtn.simulate('click');
    expect(updateCmt.mock.calls.length).toBe(1)
  });

  it("should call deletCmt when click delete button", () => {
    const deleteCmt = jest.fn((id, value) => { return null })
    setComponent(true, {}, deleteCmt);

    let editOrDelete = component.find(".edit-or-delete");
    let deleteBtn = editOrDelete.find("ForwardRef(Chip)").at(1)
    deleteBtn.simulate('click');
    expect(deleteCmt.mock.calls.length).toBe(1)
  });

  // it("should render like button if isMine is false", () => {
  //   setComponent(false);
  //   let commentLikeBtn = component.find(".commentLikeBtn");
  //   expect(commentLikeBtn.length).not.toBe(0);
  // });

  // it("should color \'comment like\' button when user clicks it", () => {
  //   setComponent(false);
  //   let commentLikeBtn = component.find(".commentLikeBtn").first();
  //   commentLikeBtn.simulate('click');
  //   commentLikeBtn = component.find('.commentLikeBtn').first();
  //   expect(commentLikeBtn.props().variant).toBe("filled")
  // });
});