import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  SideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState, props) => {
      return  {
        showSideDrawer: !prevState.showSideDrawer
    }
  });
  }

  render () {
    return (
      <>
        <Toolbar
          clickToShowSideDrawer={this.sideDrawerToggleHandler}
          isAuthenticated={this.props.isAuthenticated} />
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.SideDrawerClosedHandler}
          isAuthenticated={this.props.isAuthenticated} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

export default connect(mapStateToProps)(Layout);
