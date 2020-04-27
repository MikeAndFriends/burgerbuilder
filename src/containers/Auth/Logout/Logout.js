import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount () {
    this.props.onLogout();
    this.props.onSetIsInTheOrderProcess(false);
    this.props.onSetAuthRedirectPath('/');
  }

  render () {
    return <Redirect to="/login" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout:                 ()              => (dispatch(actionCreators.logout())),
    onSetIsInTheOrderProcess: (truefalse)     => (dispatch(actionCreators.isInTheOrderProcess(truefalse))),
    onSetAuthRedirectPath:    (path)          => (dispatch(actionCreators.setAuthRedirectPath(path))),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
