import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';


import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

const mockStore = getMockStore({});

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

  it('should be redirected signin page', () => {
    history.push('/sign/login');
    const component = mount(app);
    expect(component.find('Signin').exists()).toBe(true);
  })

  it('should be redirected join page', () => {
    history.push('/sign/join');
    const component = mount(app);
    expect(component.find('Signup').exists()).toBe(true);
  })

  it('should be redirected mypage page', () => {
    history.push('/mypage/1');
    const component = mount(app);
    expect(component.find('MyPage').exists()).toBe(true);
  })

  it('should be redirected Ranking page', () => {
    history.push('/rank');
    const component = mount(app);
    expect(component.find('Ranking').exists()).toBe(true);
  })

  it('should be redirected SearchResult page', () => {
    history.push('/search/1');
    const component = mount(app);
    expect(component.find('SearchResult').exists()).toBe(true);
  })

  it('should be redirected SearchResult group page', () => {
    history.push('/search/group/1');
    const component = mount(app);
    expect(component.find('SearchResult').exists()).toBe(true);
  })

  it('should be redirected video page', () => {
    history.push('/video');
    const component = mount(app);
    expect(component.find('VideoIndexing').exists()).toBe(true);
  })

  it('should be redirected VideoSearching page', () => {
    history.push('/video/search');
    const component = mount(app);
    expect(component.find('VideoSearching').exists()).toBe(true);
  })

  it('should be redirected VideoResult page', () => {
    history.push('/video/result');
    const component = mount(app);
    expect(component.find('VideoResult').exists()).toBe(true);
  })
});
