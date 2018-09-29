import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';
import {
  objectOf, any, number, string,
} from 'prop-types';

import { calcDuration, formatNumber, filterDaysByMonth } from '../utils';
import Progress from './progress';
import Hour from './hour';
import Text from './text';
import Row from './row';
import Col from './col';

const Wrapper = styled.View`
flex-direction: row;
flex: 4 1 0;
`;

const NothingToShow = () => (
  <Text label center>NENHUM REGISTRO PARA MOSTRAR</Text>
);

const renderDay = (date) => {
  const day = moment(date, 'YYYYMMDD').format('DD/MM');
  const today = moment().format('DD/MM');
  if (day === today) return 'HOJE';
  return day;
};

const Table = ({
  registry: { days, history, months }, navigation: { navigate }, depth, month,
}) => {
  if (!days.length) return <NothingToShow />;
  const currentMonth = month || months[0];
  const currentDays = filterDaysByMonth(days, currentMonth);
  if (!currentDays.length) return <NothingToShow />;
  return (
    currentDays.map((day, index) => {
      const dayTotal = calcDuration(history[day]).total;
      return (
        (index < depth)
          ? (
            <Col key={`registry-day-list-${depth}-${index}`} onPress={() => navigate('Edit', { day })}>
              { depth > 1 ? <Progress mini day={history[day]} /> : null }
              <Row>
                <Hour total>{renderDay(day)}</Hour>
                <Wrapper>
                  {history[day].map((position, idx) => (
                    <Hour flex={0.25} key={`registry-hour-list-${depth}-${idx}`} index={idx} length={(history[day].length)}>
                      {moment(position.timestamp).format('H:mm')}
                    </Hour>
                  ))}
                </Wrapper>
                <Hour total>{formatNumber(dayTotal)}</Hour>
              </Row>
            </Col>
          ) : null
      );
    })
  );
};

Table.propTypes = {
  navigation: objectOf(any).isRequired,
  registry: objectOf(any).isRequired,
  depth: number,
  month: string,
};

Table.defaultProps = {
  month: '',
  depth: 31,
};

export default connect(state => state)(withNavigation(Table));
