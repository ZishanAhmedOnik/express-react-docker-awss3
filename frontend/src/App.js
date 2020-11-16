import React from 'react';

import { Provider } from 'react-redux';
import FileList from './components/FileListComponent';
import FileUploadComponent from './components/FileUploadComponent';
import NavbarComponent from './components/NavbarComponent';
import VideoPlayer from './components/VideoPlayer';

import store from './redux/store';

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'http://localhost:8080/aws/download/5e5d582a-ca9f-49a2-956e-cbd05a0d1dd6.mp4',
    type: 'video/mp4'
  }]
}


function App() {
  return (
    <Provider store={store}>
      <NavbarComponent />
      <div className="container">
        <FileUploadComponent />
        <FileList></FileList>

        <br></br>
        <br></br>

        <VideoPlayer { ...videoJsOptions } />
      </div>
    </Provider>
  );
}

export default App;
