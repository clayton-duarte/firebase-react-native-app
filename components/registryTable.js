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
color: ${({ theme, total }) => (total ? theme.action : theme.secondary)};
font-size: 12px;
`;

const renderDay = date => {
  const day = moment(date, 'YYYYMMDD').format('dddd DD/MM/YYYY');
  const today = moment().format('dddd DD/MM/YYYY');
  if(day === today) return 'HOJE';
  return day;
};

const Wrapper = styled.View`
flex-direction: row;
flex: 4 1 0;
`;

const changeIcon = index => ((index % 2) ? 'log-out' : 'log-in');

const Table = ({
  registry: { days, history }, navigation: { navigate }, depth,
}) => (
  days.map((day, index) => (
    (index < depth)
    ? (
      <Col key={`registry-day-list-${depth}-${index}`} onPress={() => navigate('Edit', { day })}>
        <Row>
          <Day date flex={4}>{renderDay(day)}</Day>
          <Day date flex={1}>TOTAL</Day>
        </Row>
        <Row>
          <Wrapper>
            {history[day].map((position, index) => (
              <Hour flex={.25} key={`registry-hour-list-${depth}-${index}`} index={index} length={(history[day].length)}>
                <StyledIcon name={changeIcon(index)} />
                {moment(position.timestamp).format('H:mm')}
              </Hour>
            ))}
          </Wrapper>
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