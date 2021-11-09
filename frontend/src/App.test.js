import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';;

import App from './App';
import { history } from './store/store';

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    )
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

  it('should be redirected to error page', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('h1').text()).toBe('Not Found');
  })
});
