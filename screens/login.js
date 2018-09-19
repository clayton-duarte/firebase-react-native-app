import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { signInWithEmailAndPassword } from '../actions';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import Input from '../components/input';
import Text from '../components/text';
import View from '../components/view';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.action};
${({ theme }) => theme.text_shadow};
margin: 50px auto -50px auto;
align-self: center;
font-size: 100px;
`;

class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'flexgh.us@gmail.com',
      password: '1qaz1qaz',
    };
    this.handleSubmit = async () => {
      await this.setState({ loading: true });
      const { email, password } = this.state;
      this.props.signInWithEmailAndPassword({ email, password })
        .then(this.setState({ loading: false }));
    };
  }

  render() {
    return(
      <View>
        <Wrapper><StyledIcon name='timer' /></Wrapper>
        <Wrapper>
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
          <Button disabled={this.state.loading} onPress={this.handleSubmit}>LOGIN</Button>
          <Button secondary disabled={this.state.loading} onPress={this.handleSubmit}>CADASTRO</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ signInWithEmailAndPassword }, dispatch);
export default connect(state => state, mapDispatchToProps)(LoadScreen);