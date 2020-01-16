import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {

    state = { videos: [], selectedVideo: null }

    onSelectVideo = (video) => {
        console.log(video)
        this.setState({ selectedVideo: video })
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get("/search", {
            params: {
                q: term
            }
        });
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] })
    };

    componentDidMount = () => {
        this.onTermSubmit('React JS')
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit}></SearchBar>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}></VideoDetail>
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onSelectVideo={this.onSelectVideo}></VideoList>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;