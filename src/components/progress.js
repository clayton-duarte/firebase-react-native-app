import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import moment from 'moment';
import React from 'react';
import {
  objectOf, any, arrayOf, bool,
} from 'prop-types';

import { calcDuration } from '../utils';

const InsideIcon = styled(Icon)`
color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.text_shadow};
font-size: 10px;
`;

const BackIcon = styled.View`
background-color: ${({ theme }) => theme.bg_secondary};
${({ theme }) => theme.shadow};
border-radius: 12px;
position: absolute;
padding: 2px;
height: 24px;
width: 24px;
margin: 0;
`;

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
${({ theme }) => theme.text_shadow};
text-align: center;
font-size: 18px;
`;

const FloatIcon = styled(BackIcon)`
left: ${({ size }) => size}%;
margin-left: -12px;
`;

const HomeIcon1 = styled(BackIcon)`
left: -12px;
`;

const HomeIcon2 = styled(BackIcon)`
right: -12px;
`;

const Outside = styled.View`
background-color: ${({ theme }) => theme.bg_primary};
${({ theme, mini }) => (mini ? '' : theme.shadow)};
border-radius: ${({ mini }) => (mini ? 0 : 8)}px;
margin: ${({ mini }) => (mini ? 0 : '4px 0')};
height: ${({ mini }) => (mini ? 2 : 16)}px;
flex-direction: row;
align-items: center;
position: relative;
overflow: hidden;
width: 100%;
`;

const Inside = styled.View`
background-color: ${({ theme, index }) => ((index % 2) ? theme.warn : theme.action)};
height: ${({ mini }) => (mini ? 2 : 16)}px;
width: ${({ size }) => size}%;
justify-content: center;
align-items: center;
`;

const Row = styled.View`
flex-direction: row;
align-items: center;
margin: 0 4px;
height: 24px;
`;

// TIME FUNCTIONS
const calcTime = (day, duration, days) => {
  // VERIFY
  if (!day.length) return day;
  if (days[0] !== moment().format('YYYYMMDD')) return [];
  // CALC
  const { length } = day;
  const { morning, lunch, afternoon } = duration;
  const lastRegistry = day[(length - 1)].timestamp;
  const last = moment(lastRegistry);
  const diff = moment.duration(moment().diff(last)).asHours();
  // RETURN
  switch (length) {
    case 1:
      if (diff > 8) return [];
      return [diff];
    case 2:
      if (diff > 8) return [morning];
      return [morning, diff];
    case 3:
      if (diff > 8) return [morning];
      return [morning, lunch, diff];
    case 4:
      return [morning, lunch, afternoon];
    default:
      return [];
  }
};

const iconList = ['briefcase', 'hand', 'briefcase', 'add'];

const Progress = ({ registry: { history, days, profile }, day, mini }) => {
  // GET A DAY OR TODAY
  const dayRegistry = ((day.length && days.length) ? day : history[days[0]]);
  // CALC DURATIONS WORK AND LANCH
  const { total, lunch, ...rest } = calcDuration(dayRegistry);
  const todaysJourney = Number(total > profile.journey ? total : profile.journey);
  const todaysLunch = Number(lunch || moment.duration(profile.lunch, 'm').asHours());
  // CALC PERCENTS OF THIS DURATIONS
  const percent = calcTime(dayRegistry, { lunch, ...rest }, days).map(data => (data * 100 / (todaysJourney + todaysLunch)));
  // RETURN MINI PROGRESS BAR
  if (mini) {
    return (
      <Outside mini>
        {
        percent.map((size, index) => (
          <Inside mini key={`mini-progress-inside-bar-${dayRegistry}-${index}`} index={index} size={size} />
        ))
      }
      </Outside>
    );
  }
  // OR RETURN COMPLETE PROGRESS BAR
  const left = percent.reduce((acc, cur) => (acc + cur), 0);
  return (
    <Row>
      <Outside>
        {
          percent.map((size, index) => (
            <Inside key={`progress-inside-bar-${dayRegistry}-${index}`} index={index} size={size}>
              <InsideIcon name={iconList[index]} />
            </Inside>
          ))
        }
      </Outside>
      <HomeIcon1><StyledIcon name="home" /></HomeIcon1>
      <HomeIcon2><StyledIcon name="home" /></HomeIcon2>
      { (left && left < 100) ? <FloatIcon size={left}><StyledIcon name="walk" /></FloatIcon> : null }
    </Row>
  );
};

Progress.propTypes = {
  registry: objectOf(any).isRequired,
  day: arrayOf(any),
  mini: bool,
};

Progress.defaultProps = {
  mini: false,
  day: [],
};

export default connect(state => state)(Progress);
