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
      cash: 0,
      journey: 8,
      lunch: 60,
    };
    this.handleSubmit = () => {
      const { displayName, journey, lunch, cash } = this.state;
      this.props.updateProfile({ displayName, journey, lunch, cash });
      this.props.navigation.navigate('Registry');
    };
    this.setCurrentUserData = () => {
      const { journey, lunch, cash } = this.props.registry.profile;
      const { displayName } = this.props.auth.user;
      this.setState({ displayName, journey, lunch, cash, loading: false });
    }
  }
   
  componentDidMount() {
    this.setCurrentUserData();
  }

  render() {
    const { loading, displayName, journey, lunch, cashMonth, cash } = this.state;
    const { signOut } = this.props;
    if (loading) return <View><Loader /></View>
    return(
      <View>
        <Header />
        <Text title>MEU PERFIL</Text>
        <Wrapper>
          <Text label><StyledIcon name='person' />{' '}NOME:</Text>
          <Input
            placeholder='EU MESMO'
            value={displayName}
            onChangeText={displayName => this.setState({ displayName })}
            onBlur={() => this.setState(prevState => ({ displayName: prevState.displayName.toUpperCase() }))}
          />
          <Row>
            <Col>
              <Text label><StyledIcon name='calendar' />{' '}VALOR MÊS:</Text>
              <Input
                placeholder='R$ 0,00'
                value={cashMonth.toString()}
                onChangeText={cashMonth => this.setState({ cashMonth })}
                onBlur={() => this.setState(({ cashMonth }) => ({ cash: Number(cashMonth / 168).toFixed(2), cashMonth: Number(cashMonth).toFixed(2) }))}
              />
            </Col>
            <StyledIcon name='swap' />
            <Col>
              <Text label><StyledIcon name='timer' />{' '}VALOR HORA:</Text>
              <Input
                placeholder='R$ 0,00'
                value={cash.toString()}
                onChangeText={cash => this.setState({ cash })}
                onBlur={() => this.setState(({ cash }) => ({ cashMonth: Number(cash * 168).toFixed(2), cash: Number(cash).toFixed(2) }))}
              />
            </Col>
          </Row>
        </Wrapper>
        <Wrapper>
          <Text label><StyledIcon name='briefcase' />{' '}JORNADA DIÁRIA: <Value>{journey}h</Value></Text>
            <Slider
              step={1}
              value={journey}
              minimumValue={4}
              maximumValue={12}
              onValueChange={journey => this.setState({ journey })}
            />
            <Text label><StyledIcon name='hand' />{' '}ALMOÇO/REPOUSO: <Value>{lunch}min</Value></Text>
            <Slider
              step={15}
              value={lunch}
              minimumValue={0}
              maximumValue={60}
              onValueChange={lunch => this.setState({ lunch })}
            />
        </Wrapper>
        <Wrapper>          
          <Button onPress={this.handleSubmit}>SALVAR DADOS</Button>
          <Button secondary onPress={signOut}>LOGOUT</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ updateProfile, signOut }, dispatch);
export default connect(state => state, mapDispatchToProps)(EditScreen);