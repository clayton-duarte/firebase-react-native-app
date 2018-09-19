import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { signInWithEmailAndPassword } from '../actions';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import Input from '../components/input';
import Text from '../components/text';
import View from '../components/view';

const { width } = Dimensions.get('window');

const StyledIcon1 = styled(Icon)`
color: ${({ theme }) => theme.primary};
left: ${(width / 2 ) - 45};
/* color: rgba(0, 0, 0, .1); */
position: absolute;
align-self: center;
font-size: 100px;
top: 55;
`;

const StyledIcon2 = styled(StyledIcon1)`
color: ${({ theme }) => theme.secondary};
left: ${(width / 2 ) - 50};
top: 50px;
`;

const StyledIcon3 = styled(StyledIcon1)`
color: ${({ theme }) => theme.action};
left: ${(width / 2 ) - 55};
top: 45px;
`;

const Row = styled.TouchableOpacity`
flex-direction: row;
position: relative;
height: 150px;
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
        <Wrapper>
          <Row>
            <StyledIcon1 name='timer' />
            <StyledIcon2 name='timer' />
            <StyledIcon3 name='timer' />
          </Row>
        </Wrapper>
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