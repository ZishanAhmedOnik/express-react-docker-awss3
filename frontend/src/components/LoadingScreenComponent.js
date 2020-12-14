import { Component } from "react";
import { connect } from "react-redux";

const loadingContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'F8F8F8',
    zIndex: 2,
}

const loaderStyle = {
    left: '45%',
    top: '40%',
    zIndex: 2,
    position: 'absolute'
}

class LoadingScreenComponent extends Component {
    render() {
        if (!this.props.showLoading) {
            return null;
        }

        return (
            <div className="loader-container" style={loadingContainerStyle}>
                <div className="loader" style={loaderStyle}>
                    <img style={{ height: '100px' }} src={'http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_red_512.gif'} />
                </div>
            </div>
        )
    }
}

const mapStateTopProps = (state) => {
    return {
        showLoading: state.loadingReducer.showLoading
    }
}

export default connect(mapStateTopProps, null)(LoadingScreenComponent)