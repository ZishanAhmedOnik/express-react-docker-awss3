import { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import FileList from './components/FileListComponent';
import FileUploadComponent from './components/FileUploadComponent';
import NavbarComponent from './components/Navbar/NavbarComponent';
import AppVideoPlayer from './components/AppVideoPlayer';
import LoadingScreenComponent from './components/LoadingScreenComponent';

import store from './redux/store';
import LoginComponent from './components/Auth/LoginComponent';
import RegisterComponent from './components/Auth/RegisterComponent';

import setAutToken from '../src/helpers/SetAuthToken';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PrivateRoute/PublicRoute';

// const videoJsOptions = {
//   autoplay: true,
//   controls: true,
//   sources: [{
//     src: 'http://localhost:8080/aws/download/5e5d582a-ca9f-49a2-956e-cbd05a0d1dd6.mp4',
//     type: 'video/mp4'
//   }]
// }


class App extends Component {

  constructor(props) {
    super(props);

    setAutToken(localStorage.getItem('accessToken'));
  }

  render() {
    return (
      <Provider store={store}>
        <LoadingScreenComponent></LoadingScreenComponent>

        <Router>
          <NavbarComponent />
          <div className="container">
            <Switch>
              <PublicRoute path="/login" component={LoginComponent} exact={true}></PublicRoute>
              <PublicRoute path="/register" component={LoginComponent} exact={true}></PublicRoute>

              <PrivateRoute path="/filelist" component={FileList} exact={true}></PrivateRoute>
              <PrivateRoute path="/player" component={AppVideoPlayer} exact={true}></PrivateRoute>
              <PrivateRoute path="/" component={FileUploadComponent} exact={true}></PrivateRoute>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
