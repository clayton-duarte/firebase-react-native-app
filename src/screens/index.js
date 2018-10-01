import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { objectOf, any, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterScreen from './unlogged/register';
import RegistryScreen from './logged/registry';
import ProfileScreen from './logged/profile';
import ForgotScreen from './unlogged/forgot';
import LoginScreen from './unlogged/login';
import Loader from '../components/loader';
import HomeScreen from './logged/home';
import EditScreen from './logged/edit';
import Menu from '../components/menu';
import View from '../components/view';
import {
  verifyAuthentication, internalClock, registerForPushNotifications,
} from '../actions';

// ROUTERS
const StackNavigator = createStackNavigator({
  Registry: RegistryScreen,
  History: RegistryScreen,
  Profile: ProfileScreen,
  Today: HomeScreen,
  Edit: EditScreen,
}, {
  initialRouteName: 'Today',
  navigationOptions: {
    headerStyle: {
      display: 'none',
    },
  },
});

const Logged = createDrawerNavigator({
  Navigator: StackNavigator,
}, {
  drawerWidth: () => (Dimensions.get('window').width - 50),
  contentComponent: props => <Menu {...props} />,
  initialRouteName: 'Navigator',
});

const Unlogged = createStackNavigator({
  Register: RegisterScreen,
  Forgot: ForgotScreen,
  Login: LoginScreen,
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      display: 'none',
    },
  },
});

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    // AUTHENTICATION
    this.verifyAuthentication = async () => {
      const stopLoading = () => this.setState({ loading: false });
      this.props.verifyAuthentication(stopLoading);
    };
    // INTERNAL CLOCK
    this.startClock = () => this.setState({ clock: setInterval(this.props.internalClock, 60000) });
    this.stopClock = () => clearInterval(this.state.clock);
  }

  componentDidMount() {
    this.props.registerForPushNotifications();
    this.verifyAuthentication();
    this.startClock();
  }

  componentWillUnmount() {
    this.stopClock();
  }

  render() {
    // SETUP
    const { registry: { loadingRegistry }, auth: { user } } = this.props;
    const { loading } = this.state;
    // RETURNS
    if (loading) return (<View><Loader /></View>);
    if (user) {
      if (loadingRegistry) return (<View><Loader /></View>);
      return (<Logged />);
    }
    return (<Unlogged />);
  }
}

Auth.propTypes = {
  registerForPushNotifications: func.isRequired,
  verifyAuthentication: func.isRequired,
  internalClock: func.isRequired,
  registry: objectOf(any).isRequired,
  auth: objectOf(any).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  verifyAuthentication, internalClock, registerForPushNotifications,
}, dispatch);
export default connect(state => state, mapDispatchToProps)(Auth);
