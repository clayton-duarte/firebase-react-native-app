import { func, objectOf, any } from 'prop-types';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { createUserWithEmailAndPassword } from '../../actions';
import KeyboardView from '../../components/keyBoardView';
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

class RegisterScreen extends Component {
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
    const { navigate } = this.props.navigation;
    return (
      <View>
        <KeyboardView>
          <Wrapper>
            <Text title>CADASTRO</Text>
          </Wrapper>
          <Wrapper>
            <Text label>
              <StyledIcon name="person" />
              {' '}
              NOME:
            </Text>
            <Input
              value={this.state.displayName}
              onChangeText={displayName => this.setState({ displayName })}
              onEndEditing={() => this.setState(({ displayName }) => ({ displayName: displayName ? displayName.toUpperCase() : '' }))}
            />
            <Text label>
              <StyledIcon name="mail" />
              {' '}
              EMAIL:
            </Text>
            <Input
              keyboardType="email-address"
              placeholder="email@email.com"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              onEndEditing={() => this.setState(({ email }) => ({ email: email ? email.toLowerCase() : '' }))}
            />
            <Text label>
              <StyledIcon name="lock" />
              {' '}
              SENHA:
            </Text>
            <Input
              secureTextEntry
              placeholder="******"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <Row>
              <Text label>
                <StyledIcon name="briefcase" />
                {' '}
                JORNADA DIÁRIA:
              </Text>
              <Card>
                <Text label>
                  {this.state.journey}
                  h
                </Text>
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
              <Text label>
                <StyledIcon name="briefcase" />
                {' '}
                ALMOÇO/REPOUSO:
              </Text>
              <Card>
                <Text label>
                  {this.state.lunch}
                  min
                </Text>
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
            <Row>
              <Button flex={1} secondary onPress={() => navigate('Login', { email: this.state.email })}>VOLTAR</Button>
              <Button flex={1} onPress={this.handleSubmit}>REGISTRAR</Button>
            </Row>
          </Wrapper>
        </KeyboardView>
      </View>
    );
  }
}

RegisterScreen.propTypes = {
  createUserWithEmailAndPassword: func.isRequired,
  navigation: objectOf(any).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ createUserWithEmailAndPassword }, dispatch);
export default connect(state => state, mapDispatchToProps)(RegisterScreen);
