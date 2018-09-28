import styled from 'styled-components/native';
import React, { Component } from 'react';
import { Icon } from 'native-base';

import Day from './day';
import Row from './row';
import Col from './col';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.bg_primary};
font-size: 12px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toogleText = () => this.setState(prevState => ({ text: !prevState.text }));
  }

  render() {
    const { text } = this.state;
    return (
      <Col onPress={this.toogleText}>
        <Row>
          <Day>{text ? 'DATA' : <StyledIcon name="calendar" /> }</Day>
          <Day>{text ? 'ENT1' : <StyledIcon name="log-in" /> }</Day>
          <Day>{text ? 'SAI1' : <StyledIcon name="log-out" /> }</Day>
          <Day>{text ? 'ENT2' : <StyledIcon name="log-in" /> }</Day>
          <Day>{text ? 'SAI2' : <StyledIcon name="log-out" /> }</Day>
          <Day>{text ? 'TOTAL' : <StyledIcon name="clock" /> }</Day>
        </Row>
      </Col>
    );
  }
}
