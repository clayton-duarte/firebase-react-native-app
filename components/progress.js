import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import moment from 'moment';
import React from 'react';

import { calcDuration } from '../utils';

const LunchIcon = styled(Icon)`
color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.text_shadow};
font-size: 10px;
`;

const PersonIcon = styled(Icon)`
background-color: ${({ theme }) => theme.bg_secondary};
color: ${({ theme }) => theme.secondary};
${({ theme }) => theme.text_shadow};
${({ theme }) => theme.shadow};
left: ${({ size }) => size}%;
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
background-color: ${({ theme, index }) => (index === 1) ? theme.warn : theme.action};
width: ${({ size }) => size}%;
justify-content: center;
align-items: center;
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
  if (!today) return [];
  // CALC
  const length = today.length;
  const { morning, lunch, afternoon } = calcDuration(today);
  const lastRegistry = today[(length - 1)].timestamp;
  const last = moment(lastRegistry);
  const diff = moment.duration(moment().diff(last)).asHours();
  // RETURN
  switch (length) {
    case 1:
      return [ diff ];
    case 2:
      return [ morning, diff ];
    case 3:
      return [ morning, lunch, diff ];
    case 4:
      return [ morning, lunch, afternoon ];  
    default:
      return [];
  }
}

const Logo = ({ registry: { history, days } }) => {
  const percent = calcTime(history, days).map(data => (data * 100 / 8));
  return (
    <Row>
      <Outside>
        {
          percent.map((size, index) => (
            <Inside index={index} size={size}>
              {
                (index === 1)
                ? <LunchIcon name='hand'/>
                : null
              }
            </Inside>
          ))
        }
      </Outside>
      <PersonIcon size={percent.reduce(( acc, cur ) => ( acc + cur), 0)} name='walk' />
    </Row>
  );
}

export default connect(state => state)(Logo);