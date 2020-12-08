import { Component } from 'react';

class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
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
                                <label htmlFor="userName">User Name:</label>
                                <input name="userName" onChange={this.handleChange} type="text" className="form-control" required={true} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>
                                <input name="firstName" onChange={this.handleChange} type="text" className="form-control" required={true} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input name="lastName" onChange={this.handleChange} type="text" className="form-control" required={true} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-Mail:</label>
                                <input name="email" onChange={this.handleChange} type="email" className="form-control" required={true} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input name="password" onChange={this.handleChange} type="password" className="form-control" required={true} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input name="confirmPassword" onChange={this.handleChange} type="password" className="form-control" required={true} />
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

        console.log(this.state);
    }
}

export default RegisterComponent;