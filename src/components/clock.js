import styled from 'styled-components/native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import theme from '../theme';

const Touch = styled.TouchableOpacity`
background-color: ${({ color }) => color};
justify-content: center;
border-radius: 100px;
align-items: center;
margin: 4px auto;
${theme.shadow};
padding: 12px;
height: 200px;
width: 200px;
`;

const Time = styled.Text`
color: ${({ color }) => color};
${theme.text_shadow};
letter-spacing: -2px;
text-align: center;
font-weight: bold;
font-size: 40px;
`;

const Text = styled.Text`
color: ${theme.secondary};
letter-spacing: 2px;
text-align: center;
font-weight: bold;
font-size: 12px;
`;
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
        textColor: theme.secondary,
        color: theme.bg_primary,
        text: 'STATUS',
      },
    };
    this.clockStatus = () => {
      const { history, days } = this.props.registry;
      const today = days.length ? history[days[0]] : [];
      switch (today.length) {
        case 1:
        case 3:
          return { color: theme.action, text: 'TRABALHANDO', textColor: theme.bg_primary };
        case 2:
          return { color: theme.warn, text: 'ALMOÇANDO', textColor: theme.bg_primary };
        default:
          return { color: theme.bg_primary, text: 'DESCANSANDO', textColor: theme.secondary };
      }
    };
    this.updateClock = () => this.setState(prevState => ({ tic: !prevState.tic, status: this.clockStatus() }));
    this.startClock = () => this.setState({ clock: setInterval(() => this.updateClock(), 1000) });
    this.stopClock = () => clearInterval(this.state.clock);
  }

  componentDidMount() {
    this.startClock();
  }

  componentWillUnmount() {
    this.stopClock();
  }

  render() {
    const { status } = this.state;
    return (
      <Touch {...this.props} color={status.color}>
        <Text>{status.text}</Text>
        <Time color={status.textColor}>{moment().format('H:mm:ss')}</Time>
        <Text>MARCAR PONTO</Text>
      </Touch>
    );
  }
}

export default connect(state => state)(Clock);
