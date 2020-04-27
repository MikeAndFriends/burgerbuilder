import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { NavLink } from 'react-router-dom';


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      status: null,
    }

    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(
        req => {
          this.setState({error: null});
          return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => this.setState({error: error, status: error.response.status})
        );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler} >
            {this.state.status === 401
              ? <h3>You don't have access! Please hit <NavLink
                to={'/login'}>Login...</NavLink></h3>
              : <h3>Something went wrong :-(</h3>}
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    };

  }
}

export default withErrorHandler;
