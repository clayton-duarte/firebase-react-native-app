import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import moment from 'moment';
import React from 'react';

import { calcDuration } from '../utils';
import Hour from './hour';
import Day from './day';
import Row from './row';
import Col from './col';

const StyledIcon = styled(Icon)`
color: ${({ theme, total }) => total ? theme.action : theme.secondary};
font-size: 12px;
`;

const renderDay = date => {
  const day = moment(date, 'YYYYMMDD').format('dddd DD/MM/YYYY');
  const today = moment().format('dddd DD/MM/YYYY');
  if(day === today) return 'HOJE';
  return day;
};

const changeIcon = index => ((index % 2) ? 'arrow-dropup' : 'arrow-dropdown');

const Table = ({
  registry: { days, history }, navigation: { navigate }, depth,
}) => (
  days.map((day, index) => (
    (index < depth)
    ? (
      <Col key={`registry-day-list-${depth}-${index}`} onPress={() => navigate('Edit', { day })}>
        <Row>
          <Day date>{renderDay(day)}</Day>
        </Row>
        <Row>
          {history[day].map((hour, index) => (
            <Hour key={`registry-hour-list-${depth}-${index}`} index={index}>
              <StyledIcon name={changeIcon(index)}/>{moment(hour, 'H:mm:ss').format('H:mm')}
            </Hour>
          ))}
          <Hour total><StyledIcon total name='time'/>{calcDuration(history[day])}</Hour>
        </Row>
      </Col>
    ) : null
  ))
);

Table.defaultProps = {
  depth: 31,
}

export default connect(state => state)(withNavigation(Table));