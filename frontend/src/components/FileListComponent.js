import React from "react";
import { fetchFiles } from "../redux";
import { connect } from "react-redux";


class FileList extends React.Component {
    render() {
        return(
            <div>
                <button className="btn btn-success" onClick={this.fetchFileList}>Fetch File</button>

                <div>
                    { this.props.fileList.map(file => (
                        <h1 key={file.Key}>{file.Key}</h1>
                    )) }
                </div>
            </div>
        )
    }

    fetchFileList = () => {
        this.props.fetchFiles();
    }
}

const mapStateToProps = state => {
    return {
        fileList: state.fileReducer.files
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFiles: () => dispatch(fetchFiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (FileList);
