import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Doctor from '../routes/Doctor';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';
// import Login from '../routes/Login';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './Auth/HomePage/HomePage.js'

import CustomScrollbars from '../components/CustomScrollbars';
import DetailDoctor from './Patients/Doctor/DetailDoctor';
import VerifyEmail from './Patients/VerifyEmail';



class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>

                <Router history={history}>
                    <div className="main-container">
                        {/* {this.props.isLoggedIn && <Header />} */}

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} exact component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} exact component={DetailDoctor} />
                                    <Route path='/doctor/' component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />

                                </Switch>
                            </CustomScrollbars>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);