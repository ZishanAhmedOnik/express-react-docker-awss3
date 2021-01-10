import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {    
    render() {
        const { isAuthenticated, component: Component, ...rest } = this.props;

        return (
            <Route {...rest} component={() => (
                isAuthenticated ? 
                ( <Component { ...this.props } /> ) : 
                ( <Redirect to="/login" /> )
            )} ></Route>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute);