import { Component } from "react";
import { connect } from "react-redux";

import { fileUpload } from "../redux";

class FileUploadComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentName: '',
            contentDescription: '',
            fileToUpload: null
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="contentName">Content Name:</label>
                        <input type="text" className="form-control" name="contentName" onChange={this.handleChange} required={true} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contentDescription">Content Description:</label>
                        <textarea className="form-control" name="contentDescription" onChange={this.handleChange} required={true}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">File:</label>
                        <input className="form-control" id="file" name="file" type="file" accept="video/*" onChange={this.handleChange} required={true} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-success">Upload</button>
                    </div>
                </form>
            </div>
        )
    }

    submitForm = (event, input) => {
        event.preventDefault();

        this.props.fileUpload(this.state);
    }

    handleChange = (event, input) => {
        event.preventDefault();

        if (event.target.name === 'file') {
            this.setState({
                ...this.state,
                fileToUpload: event.target.files[0]
            })
        }
        else {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value
            })
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fileUpload: (file) => dispatch(fileUpload(file))
    }
}

export default connect(null, mapDispatchToProps)(FileUploadComponent);