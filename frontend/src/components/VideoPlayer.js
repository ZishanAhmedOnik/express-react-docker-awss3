import { Component } from "react";
import { connect } from 'react-redux';
import videojs from 'video.js';

class VideoPlayer extends Component {
    // componentDidMount() {
    //     this.player = videojs(this.videNode, this.props, function onPlayerReady() {
    //         console.log('onPlayerReady', this)
    //     })
    // }

    // componentWillUnmount() {
    //     if(this.player) {
    //         this.player.dispose();
    //     }
    // }

    render() {
        return (
            <div>
                <h1>{this.props.selectedContent}</h1>
                {/* <div data-vjs-player>
                    <video ref={node => this.videNode = node} className="video-js" style={ { height: '200px', width: '350px' } }></video>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedContent: state.contentReducer.selectedContent
    }
}

export default connect(mapStateToProps, null)(VideoPlayer);