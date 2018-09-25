import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';

import { calcDuration, formatNumber } from '../utils';
import Hour from './hour';
import Progress from './progress';
import Text from './text';
import Row from './row';
import Col from './col';


const renderDay = date => {
  const day = moment(date, 'YYYYMMDD').format('DD/MM');
  const today = moment().format('DD/MM');
  if(day === today) return 'HOJE';
  return day;
};

const Wrapper = styled.View`
flex-direction: row;
flex: 4 1 0;
`;

const Table = ({
  registry: { days, history }, navigation: { navigate }, depth
}) => {
  return (
    days.length ? (
      days.map((day, index) => {
        const dayTotal = calcDuration(history[day]).total;
        return (
          (index < depth)
          ? (
            <Col key={`registry-day-list-${depth}-${index}`} onPress={() => navigate('Edit', { day })}>
              { depth > 1 ? <Progress mini day={history[day]}/> : null }
              <Row>
                <Hour total>{renderDay(day)}</Hour>
                <Wrapper>
                  {history[day].map((position, index) => (
                    <Hour flex={.25} key={`registry-hour-list-${depth}-${index}`} index={index} length={(history[day].length)}>
                      {moment(position.timestamp).format('H:mm')}
                    </Hour>
                  ))}
                </Wrapper>
                <Hour total>{formatNumber(dayTotal)}</Hour>
              </Row>
            </Col>
          ) : null
        )
      })
    ) : <Text label center>NENHUM REGISTRO PARA MOSTRAR</Text>
  );
}

Table.defaultProps = {
  depth: 31,
}

export default connect(state => state)(withNavigation(Table));