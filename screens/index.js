import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { verifyAuthentication } from '../actions';
import Loader from '../components/loader';
import RegistryScreen from './registry';
import Menu from '../components/menu';
import View from '../components/view';
import LoginScreen from './login';
import HomeScreen from './home';

// ROUTERS
const Logged = createDrawerNavigator({
  Today: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Hoje',
    }
  },
  Registry: {
    screen: RegistryScreen,
    navigationOptions: {
      title: 'Registros',
    }
  },
  History: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Fechamentos',
    }
  },
  Profile: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Meu Perfil',
    }
  },
},{
  drawerWidth: () => (Dimensions.get('window').width - 50),
  contentComponent: props => <Menu {...props} />,
  initialRouteName: 'Today',
  navigationOptions: {
    headerStyle: {
      display: 'none',
    }
  }
});

const Unlogged = createStackNavigator({
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