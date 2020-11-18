import React from "react";
import { fetchFiles } from "../redux";
import { connect } from "react-redux";


class FileList extends React.Component {
    componentDidMount() {
        this.props.fetchFiles();
    }

    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.fetchFileList}>Fetch File</button>

                {/* <div>
                    { this.props.fileList.map(file => (
                        <h1 key={file._id}>{file.contentName}</h1>
                    )) }
                </div> */}
                <hr />

                <div className="row">
                    {this.props.fileList.map(file => (
                        <div className="col card btn-light" data-key={file.key} key={file.key} onClick={this.handleCardClick} style={{ height: '200px' }}>
                            <h3>{file.contentName}</h3>
                            <p className="text-center" style={{ marginTop: '100px' }}>{file.contentDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    handleCardClick = (event) => {
        console.log(event.target.dataset.key);
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

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
