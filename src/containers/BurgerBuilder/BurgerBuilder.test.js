import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
  });

  it('should render a <Modal /> and a <OrderSummary /> element if purchasing', () => {
    wrapper.setState({purchasing: true});
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(OrderSummary)).toHaveLength(1);
  });
  it('should render a <Spinner /> element when NO ingredients', () => {
    wrapper.setProps({ingredients: null});
    expect(wrapper.find(Spinner)).toHaveLength(1);
    expect(wrapper.find(Burger)).toHaveLength(0);
    expect(wrapper.find(BurgerControls)).toHaveLength(0);
  });
  it('should render a <Burger /> element when have ingredients', () => {
    wrapper.setProps({ingredients: {salad: 0, bacon:0, cheese: 0, meat: 0}});
    expect(wrapper.find(Burger)).toHaveLength(1);
  });
  it('should render a <BurgerControls /> element when have ingredients', () => {
    wrapper.setProps({ingredients: {salad: 0, bacon:0, cheese: 0, meat: 0}});
    expect(wrapper.find(BurgerControls)).toHaveLength(1);
  });

});
