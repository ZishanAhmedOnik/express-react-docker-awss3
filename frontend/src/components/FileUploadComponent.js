import { Component } from "react";
import { connect } from "react-redux";

import { fileUpload } from "../redux";

class FileUploadComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileToUpload: null
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
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

        this.props.fileUpload(this.state.fileToUpload);
    }

    handleChange = (event, input) => {
        event.preventDefault();

        this.setState({
            ...this.state,
            fileToUpload: event.target.files[0]
        })
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fileUpload: (file) => dispatch(fileUpload(file))
    }
}

export default  connect(null, mapDispatchToProps) (FileUploadComponent);