import styled from 'styled-components/native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const Touch = styled.TouchableOpacity`
background-color: ${({ theme, working }) => working ? theme.action : theme.warn};
${({ theme }) => theme.shadow};
justify-content: center;
border-radius: 100px;
align-items: center;
margin: 4px auto;
padding: 12px;
height: 200px;
width: 200px;
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
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.working = () => {
      const { history, days } = this.props.registry;
      const today = history[days[0]];
      return (today.length % 2)
    }
    this.updateClock = () => this.setState(prevState => ({ tic: !prevState.tic, working: this.working() }));
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
    const { working } = this.state;
    return (
      <Touch {...this.props} working={working}>
        <Text>{working ? 'TRABALHANDO' : 'DESCANSANDO'}</Text>
        <Time>{moment().format(`H:mm:ss`)}</Time>
        <Text>MARCAR PONTO</Text>
      </Touch>
    );
  }
}

export default connect(state => state)(Clock);
