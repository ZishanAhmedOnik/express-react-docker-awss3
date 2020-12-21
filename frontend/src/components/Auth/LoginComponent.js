import { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux';

class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emailOrUserName: '',
            password: ''
        }
    }

    render() {
        return(
            <div>
                <div style={{ width: '400px' }} className="card ml-auto mr-auto">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="emailOrUserName">User Name:</label>
                                <input name="emailOrUserName" onChange={this.handleChange} type="text" className="form-control" required={true}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input name="password" onChange={this.handleChange} type="password" className="form-control" required={true}/>
                            </div>

                            <button type="submit" className="btn btn-success">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.loginUser(this.state);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (credentials) => dispatch(loginUser(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginComponent);