import { objectOf, any, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendPasswordResetEmail } from '../../actions';
import KeyboardView from '../../components/keyBoardView';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Input from '../../components/input';
import Text from '../../components/text';
import View from '../../components/view';
import Row from '../../components/row';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = async () => {
      const { email } = this.state;
      this.props.sendPasswordResetEmail({ email, router: this.props.navigation });
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
          <Wrapper>
            <Text title>RECUPERAÇÃO DE SENHA</Text>
          </Wrapper>
          <Wrapper>
            <Text center>
              Informe o endereço de email cadastrado e clique em enviar. Você receberá um link para resetar a sua senha através dele.
            </Text>
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
          </Wrapper>
          <Wrapper>
            <Row>
              <Button flex={1} secondary onPress={() => navigate('Login', { email: this.state.email })}>VOLTAR</Button>
              <Button flex={1} onPress={this.handleSubmit}>ENVIAR</Button>
            </Row>
          </Wrapper>
        </KeyboardView>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  sendPasswordResetEmail: func.isRequired,
  navigation: objectOf(any).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ sendPasswordResetEmail }, dispatch);
export default connect(state => state, mapDispatchToProps)(LoginScreen);
