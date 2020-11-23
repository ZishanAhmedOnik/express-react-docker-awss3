import { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import VideoPlayer from 'react-video-js-player';


class AppVideoPlayer extends Component {
    player = {}

    componentDidMount() {

        // if (this.props.selectedContent === '') {
        //     this.props.history.push('/filelist');
        // }
    }

    render() {
        return (
            <div>
                <h1>{this.props.selectedContent}</h1>

                <button onClick={this.seektopos}>Seek</button>

                <VideoPlayer controls={true} 
                    width="720"
                    height="420"
                    onReady={this.onPlayerReady}
                    onTimeUpdate={(duration) => this.onTimeUpdate(duration)}
                    src={`https://erda-public.s3.us-east-2.amazonaws.com/output/21f7622d-9b77-47dd-8aae-591795df95ea.m3u8`}>
                </VideoPlayer>
            </div>
        )
    }

    onPlayerReady = (player) => {
        console.log("ready!", player);

        this.player = player;

        this.player.on('loadedmetadata', () => {
            console.log('meta data loaded!');

            // this.player.currentTime(19.00);
        })
    }

    onTimeUpdate = (duration) => {
        console.log(duration)
    }

    seektopos = () => {
        this.player.currentTime(19.01);
    }
}

const mapStateToProps = state => {
    return {
        selectedContent: state.contentReducer.selectedContent
    }
}

export default withRouter(connect(mapStateToProps, null)(AppVideoPlayer));