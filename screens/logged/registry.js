import styled from 'styled-components/native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { calcDuration, formatNumber } from '../../utils';
import Table from '../../components/registryTable';
import Wrapper from '../../components/wrapper';
import Header from '../../components/header';
import Button from '../../components/button';
import List from '../../components/list';
import Text from '../../components/text';

const Card = styled.View`
background-color: ${({ theme }) => theme.bg_primary};
border-radius: ${({ theme }) => theme.radius};
${({ theme }) => theme.shadow};
justify-content: space-between;
flex-direction: row;
margin: 4px;
`;

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
font-size: 12px;
`;

class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.calcTotal = () => {
      const { history, days } = this.props.registry;
      if (!days.length) return 0;
      const total = days.reduce((acc, cur, index) => {
        if( index === 30) return acc; // LIMIT to last 30 days
        const total = Number(calcDuration(history[cur]).total);
        return acc + total;
      }, 0);
      return total;
    };
  }

  render() {
    const { navigation: { navigate }, registry: { profile: { cash }} } = this.props;
    return(
      <List>
        <Header />
        <Wrapper>
          <Text title>ÚLTIMOS 30 DIAS</Text>
          <Card>
            <Text label>
              <StyledIcon name='timer' />
              {' '}
              {formatNumber(this.calcTotal())}h
            </Text>
            <Text label>
              R$ {formatNumber(this.calcTotal() * cash)}
              {' '}
              <StyledIcon name='cash' />
            </Text>
          </Card>
          <Table />
          <Button onPress={() => navigate('Today')}>HOJE</Button>
        </Wrapper>
      </List>
    );
  }
}

export default connect(state => state)(LoadScreen);