import styled from 'styled-components/native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { calcDuration, formatNumber } from '../../utils';
import TableHeader from '../../components/tableHeader';
import Table from '../../components/registryTable';
import Wrapper from '../../components/wrapper';
import Header from '../../components/header';
import Button from '../../components/button';
import Card from '../../components/card';
import List from '../../components/list';
import Text from '../../components/text';
import View from '../../components/view';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
font-size: 12px;
`;

class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toogleShowCash = () => this.setState(prevState => ({ showCash: !prevState.showCash }));
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
      <View>
        {/* HEADER AND TITLE */}
        <Header />
        <List>
          <Wrapper>
            <Text title>ÚLTIMOS 30 DIAS</Text>
            {/* RESUME */}
            <Card onPress={this.toogleShowCash}>
              <Text label>
                <StyledIcon name='timer' />
                {' '}
                {formatNumber(this.calcTotal())}h
              </Text>
              <Text label>
                R$ {this.state.showCash ? formatNumber(this.calcTotal() * cash) : <StyledIcon name='eye' />}
                {' '}
                <StyledIcon name='cash' />
              </Text>
            </Card>
            {/* TABLE DATA */}
            <TableHeader />
            <Table />
            <Button onPress={() => navigate('Today')}>HOJE</Button>
          </Wrapper>
        </List>
      </View>
    );
  }
}

export default connect(state => state)(LoadScreen);