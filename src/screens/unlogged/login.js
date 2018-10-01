import { objectOf, any, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInWithEmailAndPassword } from '../../actions';
import KeyboardView from '../../components/keyBoardView';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Input from '../../components/input';
import Text from '../../components/text';
import View from '../../components/view';
import Logo from '../../components/logo';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = async () => {
      const { email, password } = this.state;
      this.props.signInWithEmailAndPassword({ email, password });
    };
    this.onBlurEmail = () => {
      if (this.state.email) this.setState(prevState => ({ email: prevState.email.toLowerCase() }));
    };
    this.getDataFromPreviousScreen = () => {
      const email = this.props.navigation.getParam('email');
      if (email) this.setState({ email });
    };
  }

  componentDidMount() {
    this.getDataFromPreviousScreen();
  }

  componentDidUpdate(prevProps) {
    const email = this.props.navigation.getParam('email');
    const prevEmail = prevProps.navigation.getParam('email');
    if (email !== prevEmail) this.getDataFromPreviousScreen();
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <View>
        <KeyboardView>
          <Wrapper />
          <Wrapper>
            <Logo size={100} />
          </Wrapper>
          <Wrapper>
            <Text label>EMAIL:</Text>
            <Input
              value={this.state.email}
              keyboardType="email-address"
              placeholder="email@email.com"
              onChangeText={email => this.setState({ email })}
              onEndEditing={this.onBlurEmail}
            />
            <Text label>SENHA:</Text>
            <Input
              secureTextEntry
              placeholder="******"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </Wrapper>
          <Wrapper>
            <Button onPress={this.handleSubmit}>LOGIN</Button>
            <Button secondary onPress={() => navigate('Register', { email: this.state.email })}>CADASTRO</Button>
          </Wrapper>
        </KeyboardView>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  signInWithEmailAndPassword: func.isRequired,
  navigation: objectOf(any).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ signInWithEmailAndPassword }, dispatch);
export default connect(state => state, mapDispatchToProps)(LoginScreen);
