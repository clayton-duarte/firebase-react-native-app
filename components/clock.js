import styled from 'styled-components/native';
import React, { Component } from 'react';
import moment from 'moment';

const Touch = styled.TouchableOpacity`
background-color: ${({ theme }) => theme.action};
${({ theme }) => theme.shadow};
border-radius: 4px;
margin: 4px auto;
padding: 12px;
`;

const Time = styled.Text`
color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.text_shadow};
font-family: sans-serif;
letter-spacing: -2px;
text-align: center;
font-weight: bold;
font-size: 40px;
`;

const Text = styled.Text`
color: ${({ theme }) => theme.primary};
font-family: sans-serif;
letter-spacing: 2px;
text-align: center;
font-weight: bold;
font-size: 12px;
`;

const Date = styled(Text)``;

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.updateClock = () => this.setState(prevState => ({ tic: !prevState.tic }));
    this.startClock = () => this.setState({ clock: setInterval(() => this.updateClock(), 1000)});
    this.stopClock = () => clearInterval(this.state.clock);
  }

  componentDidMount() {
    this.startClock();
  }

  componentWillUnmount() {
    this.stopClock();
  }

  render() {
    return (
      <Touch {...this.props}>
        <Date>{moment().format('dddd DD/MM/YYYY').toUpperCase()}</Date>
        <Time>{moment().format(`h:mm:ss a`)}</Time>
        <Text>MARCAR NOVO REGISTRO</Text>
      </Touch>
    );
  }
}
