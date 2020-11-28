import React from "react";
import { fetchFiles } from "../redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectContent } from '../redux';


class FileList extends React.Component {
    componentDidMount() {
        this.props.fetchFiles();
    }

    render() {
        return (
            <div>
                <button className="btn btn-success mr-2" onClick={this.fetchFileList}>Fetch File</button>

                {/* <div>
                    { this.props.fileList.map(file => (
                        <h1 key={file._id}>{file.contentName}</h1>
                    )) }
                </div> */}
                <hr />

                <div className="row">
                    {this.props.fileList.map(file => (
                        <div className="col card btn-light" key={file.key} onClick={() => this.handleCardClick(file.key)} style={{ height: '200px' }}>
                            <h3>{file.contentName}</h3>
                            <p className="text-center" style={{ marginTop: '100px' }}>{file.contentDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    handleCardClick = (key) => {
        this.props.selectContent(key);
        
        this.props.history.push('/player');
    }

    fetchFileList = () => {
        this.props.fetchFiles();
    }
}

const mapStateToProps = state => {
    return {
        fileList: state.fileReducer.files,
        selectedContent: state.contentReducer.selectedContent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFiles: () => dispatch(fetchFiles()),
        selectContent: (contentKey) => dispatch(selectContent(contentKey))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileList));
