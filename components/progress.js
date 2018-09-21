import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import moment from 'moment';
import React from 'react';

import { calcDuration } from '../utils';

const FloatdIcon = styled(Icon)`
background-color: ${({ theme }) => theme.bg_secondary};
color: ${({ theme }) => theme.secondary};
left: ${({ size }) => size}%;
${({ theme }) => theme.shadow};
border-radius: 10px;
margin-left: -10px;
text-align: center;
position: absolute;
font-size: 16px;
padding: 2px;
height: 20px;
width: 20px;
top: 0px;
`;

const Outside = styled.View`
background-color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.shadow};
flex-direction: row;
align-items: center;
position: relative;
border-radius: 6px;
overflow: hidden;
margin: 4px 0;
height: 12px;
width: 100%;
`;

const Inside = styled.View`
background-color: ${({ theme }) => theme.action};
width: ${({ size }) => size}%;
height: 12px;
`;

const Row = styled.View`
flex-direction: row;
align-items: center;
height: 20px;
`;

// TIME FUNCTIONS
const calcTime = (history, days) => {
  // VERIFY
  const today = history[days[0]];
  if (!today) return 0;
  // CALC
  const todayDuration = Number(calcDuration(today).replace(',', '.'));
  const lastRegistry = today[(today.length - 1)].timestamp;
  const last = moment(lastRegistry);
  const diff = moment.duration(moment().diff(last)).asHours();
  // RETURN
  if(today.length % 2) return todayDuration + diff;
  return todayDuration; 
}

const Logo = ({ registry: { history, days } }) => {
  const percent = (calcTime(history, days) * 100 / 8);
  return (
    <Row>
      <Outside>
        <Inside size={percent} />
      </Outside>
      <FloatdIcon size={percent} name='walk' />
    </Row>
  );
}

export default connect(state => state)(Logo);