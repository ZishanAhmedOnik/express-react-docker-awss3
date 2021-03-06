import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import './style.css';
import { logout } from "../../redux";


class NavbarComponent extends Component {
    logout = () => {
        this.props.logout();
    }

    render() {
        return this.props.isAuthenticated ? (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <div className="container">
                    <Link className="navbar-brand" to="/">Clone</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/filelist">File List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/player">Player</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Hi { this.props.user.firstName }</Link>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-link nav-link logoutBtn" onClick={this.logout} >Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
            :
            (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Clone</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user
})

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);