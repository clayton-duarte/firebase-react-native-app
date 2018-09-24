import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../../components/registryTable';
import Wrapper from '../../components/wrapper';
import Header from '../../components/header';
import Button from '../../components/button';
import { calcDuration } from '../../utils';
import List from '../../components/list';
import Text from '../../components/text';

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
    const { navigation: { navigate } } = this.props;
    return(
      <List>
        <Header />
        <Wrapper>
          <Text title>ÚLTIMOS 30 DIAS</Text>
          <Text title>{this.calcTotal()}</Text>
          <Table />
          <Button onPress={() => navigate('Today')}>HOJE</Button>
        </Wrapper>
      </List>
    );
  }
}

export default connect(state => state)(LoadScreen);