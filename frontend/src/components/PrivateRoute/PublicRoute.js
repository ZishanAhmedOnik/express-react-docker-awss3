import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PublicRoute extends Component {    
    render() {
        const { isAuthenticated, component: Component, ...rest } = this.props;

        return (
            <Route {...rest} component={() => (
                isAuthenticated ?
                ( <Redirect to="/" /> ) :
                ( <Component { ...this.props } /> )
            )} ></Route>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(PublicRoute);