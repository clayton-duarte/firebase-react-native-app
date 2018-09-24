import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import moment from 'moment';
import React from 'react';

import { calcDuration } from '../utils';

const InsideIcon = styled(Icon)`
color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.text_shadow};
font-size: 10px;
`;

const HomeIcon = styled(Icon)`
background-color: ${({ theme }) => theme.bg_secondary};
color: ${({ theme }) => theme.secondary};
${({ theme }) => theme.text_shadow};
${({ theme }) => theme.shadow};
border-radius: 12px;
text-align: center;
position: absolute;
font-size: 18px;
padding: 2px;
height: 24px;
width: 24px;
margin: 0;
`;

const FloatIcon = styled(HomeIcon)`
left: ${({ size }) => size}%;
margin-left: -6px;
`;

const HomeIcon1 = styled(HomeIcon)`
left: -4px;
`;

const HomeIcon2 = styled(HomeIcon)`
right: -4px;
`;

const Outside = styled.View`
background-color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.shadow};
flex-direction: row;
align-items: center;
border-radius: 8px;
position: relative;
overflow: hidden;
margin: 4px 0;
height: 16px;
width: 100%;
`;

const Inside = styled.View`
background-color: ${({ theme, index }) => (index % 2) ? theme.warn : theme.action};
width: ${({ size }) => size}%;
justify-content: center;
align-items: center;
height: 16px;
`;

const Row = styled.View`
flex-direction: row;
align-items: center;
margin: 0 4px;
height: 24px;
`;

// TIME FUNCTIONS
const calcTime = (today, duration) => {
  // VERIFY
  if (!today.length) return [];
  // CALC
  const length = today.length;
  const { morning, lunch, afternoon } = duration;
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

const iconList = ['briefcase', 'hand', 'briefcase', 'add'];

const Progress = ({ registry: { history, days, profile: { journey } } }) => {
  const today = days.length ? history[days[0]] : [];
  const { total, ...rest } = calcDuration(today);
  const percent = calcTime(today, {...rest}).map(data => (data * 100 / (total > journey ? total : journey)));
  const left = percent.reduce(( acc, cur ) => ( acc + cur), 0);
  return (
    <Row>
      <Outside>
        {
          percent.map((size, index) => (
            <Inside key={`progress-inside-bar-${index}`} index={index} size={size}>
              <InsideIcon name={iconList[index]}/>
            </Inside>
          ))
        }
      </Outside>
      <HomeIcon1 name='home'/>
      { (left > 1 && left < 100) ? <FloatIcon size={left} name='walk' /> : null }
      <HomeIcon2 name='home'/>
    </Row>
  );
}

export default connect(state => state)(Progress);