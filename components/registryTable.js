import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';

import { calcDuration } from '../utils';
import Hour from './hour';
import Day from './day';
import Row from './row';
import Col from './col';

const renderDay = date => {
  const day = moment(date, 'YYYYMMDD').format('dddd DD/MM/YYYY');
  const today = moment().format('dddd DD/MM/YYYY');
  if(day === today) return 'HOJE';
  return day;
};

const Table = ({ registry: { days, history }, depth }) => (
  days.map((day, index) => (
    (index < depth)
    ? (
      <Col>
        <Row>
          <Day date>{renderDay(day)}</Day>
        </Row>
        <Row>
          {history[day].map((hour, index) => (
            <Hour index={index}>{moment(hour, 'H:mm:ss').format('H:mm')}</Hour>
          ))}
          <Hour total>{calcDuration(history[day])}</Hour>
        </Row>
      </Col>
    ) : null
  ))
);

Table.defaultProps = {
  depth: 31,
}

export default connect(state => state)(Table);