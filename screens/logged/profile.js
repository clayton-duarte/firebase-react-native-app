import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { updateProfile, signOut } from '../../actions';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Header from '../../components/header';
import Slider from '../../components/slider';
import Loader from '../../components/loader';
import Input from '../../components/input';
import Text from '../../components/text';
import View from '../../components/view';
import Row from '../../components/row';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
font-size: 12px;
`;

const Value = styled.Text`
color: ${({ theme }) => theme.primary};
font-size: 12px;
`;

const Col = styled.View`
flex: 1;
`;

class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cashMonth: 0,
      journey: 8,
      lunch: 60,
      cash: 0,
    };
    this.handleSubmit = () => {
      const { displayName, journey, lunch, cash } = this.state;
      this.props.updateProfile({ displayName, journey, lunch, cash });
      this.props.navigation.goBack();
    };
    this.setCurrentUserData = () => {
      const { journey, lunch, cash } = this.props.registry.profile;
      const { displayName } = this.props.auth.user;
      this.setState({ 
        cashMonth: (cash * 168),
        loading: false,
        displayName,
        journey,
        lunch,
        cash,
      });
    }
  }
   
  componentDidMount() {
    this.setCurrentUserData();
  }

  render() {
    if (this.state.loading) return <View><Loader /></View>
    return(
      <View>
        <Header />
        <Text title>MEU PERFIL</Text>
        <Wrapper>
          <Text label><StyledIcon name='person' />{' '}NOME:</Text>
          <Input
            placeholder='EU MESMO'
            value={this.state.displayName}
            onChangeText={displayName => this.setState({ displayName })}
            onBlur={() => this.setState(prevState => ({ displayName: prevState.displayName.toUpperCase() }))}
          />
          <Row>
            <Col>
              <Text label><StyledIcon name='cash' />{' '}VALOR MÊS:</Text>
              <Row>
                <Input value='R$' editable={false} />
                <Col>
                  <Input
                    placeholder='R$ 0,00'
                    keyboardType='number-pad'
                    value={this.state.cashMonth.toString()}
                    onChangeText={cashMonth => this.setState({ cashMonth })}
                    onBlur={() => this.setState(({ cashMonth }) => ({ cash: Math.floor(cashMonth / 168), cashMonth }))}
                  />
                </Col>
              </Row>
            </Col>
            <StyledIcon style={{ marginBottom: -24 }} name='swap' />
            <Col>
              <Text label><StyledIcon name='cash' />{' '}VALOR HORA:</Text>
              <Row>
                <Input value='R$' editable={false} />
                <Col>
                  <Input
                    placeholder='0,00'
                    keyboardType='number-pad'
                    value={this.state.cash.toString()}
                    onChangeText={cash => this.setState({ cash })}
                    onBlur={() => this.setState(({ cash }) => ({ cashMonth: (cash * 168), cash }))}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Wrapper>
        <Wrapper>
          <Text label><StyledIcon name='briefcase' />{' '}JORNADA DIÁRIA: <Value>{this.state.journey}h</Value></Text>
            <Slider
              step={1}
              minimumValue={4}
              maximumValue={12}
              value={this.state.journey}
              onValueChange={journey => this.setState({ journey })}
            />
            <Text label><StyledIcon name='hand' />{' '}ALMOÇO/REPOUSO: <Value>{this.state.lunch}min</Value></Text>
            <Slider
              step={15}
              minimumValue={0}
              maximumValue={60}
              value={this.state.lunch}
              onValueChange={lunch => this.setState({ lunch })}
            />
        </Wrapper>
        <Wrapper>          
          <Button onPress={this.handleSubmit}>SALVAR DADOS</Button>
          <Button secondary onPress={this.props.signOut}>LOGOUT</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ updateProfile, signOut }, dispatch);
export default connect(state => state, mapDispatchToProps)(EditScreen);