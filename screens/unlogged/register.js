import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { createUserWithEmailAndPassword } from '../../actions';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Slider from '../../components/slider';
import Input from '../../components/input';
import Text from '../../components/text';
import View from '../../components/view';
import Card from '../../components/card';
import Row from '../../components/row';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
font-size: 12px;
`;

class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journey: 8,
      lunch: 30,
      cash: 0,
    };
    this.handleSubmit = () => {
      this.props.createUserWithEmailAndPassword({ ...this.state });
    };
  }

  render() {
    const { displayName, email, password, journey, lunch } = this.state;
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Wrapper>
          <Text title>CADASTRO</Text>
        </Wrapper>
        <Wrapper>
        <Text label><StyledIcon name='person' />{' '}NOME:</Text>
          <Input
            value={displayName}
            onChangeText={displayName => this.setState({ displayName })}
            onEndEditing={() => this.setState(prevState => ({ displayName: prevState.displayName.toUpperCase() }))}
          />
          <Text label><StyledIcon name='mail' />{' '}EMAIL:</Text>
          <Input
            value={email}
            keyboardType='email-address'
            placeholder='email@email.com'
            onChangeText={email => this.setState({ email })}
            onEndEditing={() => this.setState(prevState => ({ email: prevState.email.toLowerCase() }))}
          />
          <Text label><StyledIcon name='lock' />{' '}SENHA:</Text>
          <Input
            secureTextEntry
            value={password}
            placeholder='******'
            onChangeText={password => this.setState({ password })}
          />
          <Row>
            <Text label><StyledIcon name='briefcase' />{' '}JORNADA DIÁRIA:</Text>
            <Card>
              <Text label>{this.state.journey}h</Text>
            </Card>
          </Row>
          <Slider
            step={1}
            minimumValue={4}
            maximumValue={12}
            value={this.state.journey}
            onValueChange={journey => this.setState({ journey })}
          />
          <Row>
            <Text label><StyledIcon name='briefcase' />{' '}ALMOÇO/REPOUSO:</Text>
            <Card>
              <Text label>{this.state.lunch}min</Text>
            </Card>
          </Row>
          <Slider
            step={15}
            minimumValue={0}
            maximumValue={60}
            value={this.state.lunch}
            onValueChange={lunch => this.setState({ lunch })}
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