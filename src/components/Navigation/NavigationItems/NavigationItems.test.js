import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavItem /> elements if NOT authenticated', () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
  it('should render four <NavItem /> elements if authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavItem)).toHaveLength(4);
  });
  it('should render <NavItem>Logout</NavItem> if authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavItem link='/logout'>Logout</NavItem>)).toEqual(true);
  })

});
