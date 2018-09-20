import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { verifyAuthentication } from '../actions';
import RegisterScreen from './unlogged/register';
import RegistryScreen from './logged/registry';
import ProfileScreen from './logged/profile';
import LoginScreen from './unlogged/login';
import Loader from '../components/loader';
import HomeScreen from './logged/home';
import EditScreen from './logged/edit';
import Menu from '../components/menu';
import View from '../components/view';

// ROUTERS
const Logged = createDrawerNavigator({
  Today: HomeScreen,
  Registry: RegistryScreen,
  History: RegistryScreen,
  Profile: ProfileScreen,
  Edit: EditScreen,
},{
  drawerWidth: () => (Dimensions.get('window').width - 50),
  contentComponent: props => <Menu {...props} />,
  initialRouteName: 'Today',
  navigationOptions: {
    header: {
      display: 'none',
    }
  }
});

const Unlogged = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen,
},{
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      display: 'none',
    }
  }
});

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
    this.verifyAuthentication = async () => {
      const stopLoading = () => this.setState({ loading: false });
      this.props.verifyAuthentication(stopLoading);
    }
  }

  componentDidMount() {
    this.verifyAuthentication();
  }

  render() {
    const { user } = this.props.auth;
    const { loading } = this.state;
    if (loading) return (<View><Loader/></View>);
    if (user) return (<Logged />);
    return (<Unlogged />);
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ verifyAuthentication }, dispatch);
export default connect(state => state, mapDispatchToProps)(Auth);