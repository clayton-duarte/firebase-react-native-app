import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createUserWithEmailAndPassword } from '../../actions';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Input from '../../components/input';
import Text from '../../components/text';
import View from '../../components/view';

class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = () => {
      const { email, password, displayName } = this.state;
      this.props.createUserWithEmailAndPassword({ email, password, displayName });
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Wrapper>
          <Text title>CADASTRO</Text>
        </Wrapper>
        <Wrapper>
        <Text label>NOME:</Text>
          <Input
            placeholder='Meu Nome'
            value={this.state.displayName}
            onChangeText={displayName => this.setState({ displayName })}
          />
          <Text label>EMAIL:</Text>
          <Input
            value={this.state.email}
            placeholder='email@email.com'
            onChangeText={email => this.setState({ email })}
            onEndEditing={() => this.setState(prevState => ({ email: prevState.email.toLowerCase() }))}
          />
          <Text label>SENHA:</Text>
          <Input
            secureTextEntry
            placeholder='******'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </Wrapper>
        <Wrapper>
          <Button onPress={this.handleSubmit}>REGISTRAR</Button>
          <Button secondary onPress={() => navigate('Login')}>JÁ TENHO CADASTRO</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ createUserWithEmailAndPassword }, dispatch);
export default connect(state => state, mapDispatchToProps)(LoadScreen);