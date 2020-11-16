import React from 'react';

import { Provider } from 'react-redux';
import FileList from './components/FileListComponent';
import FileUploadComponent from './components/FileUploadComponent';
import NavbarComponent from './components/NavbarComponent';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <NavbarComponent />


      <div className="container">
        <FileUploadComponent />
        <FileList></FileList>
      </div>
    </Provider>
  );
}

export default App;
