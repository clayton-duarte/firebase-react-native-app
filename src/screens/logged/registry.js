import styled from 'styled-components/native';
import { objectOf, any } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import moment from 'moment';

import { calcDuration, formatNumber, filterDaysByMonth } from '../../utils';
import TableHeader from '../../components/tableHeader';
import Table from '../../components/registryTable';
import Wrapper from '../../components/wrapper';
import Header from '../../components/header';
import Loader from '../../components/loader';
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
    this.state = {
      loading: true,
    };
    this.setMonthToShow = () => {
      let month = this.props.navigation.getParam('month');
      if (!month) month = moment().format('YYYYMM');
      this.setState({ month, loading: false });
    };
    this.toogleShowCash = () => this.setState(prevState => ({ showCash: !prevState.showCash }));
    this.calcTotal = () => {
      const { history, days, months } = this.props.registry;
      if (!days.length) return 0;
      const currentDays = filterDaysByMonth(days, months[0]);
      const sum = currentDays.reduce((acc, cur, index) => {
        if (index === 30) return acc; // LIMIT to last 30 days
        const total = Number(calcDuration(history[cur]).total);
        return acc + total;
      }, 0);
      return sum;
    };
  }

  componentDidMount() {
    this.setMonthToShow();
  }

  render() {
    const { navigation: { navigate }, registry: { profile: { cash } } } = this.props;
    const { month, loading } = this.state;
    if (loading) return <View><Loader /></View>;
    return (
      <View>
        {/* HEADER AND TITLE */}
        <Header />
        <List>
          <View inset>
            <Wrapper>
              <Text title>{moment().format('MMMM').toUpperCase()}</Text>
              {/* RESUME */}
              <Card onPress={this.toogleShowCash}>
                <Text label>
                  <StyledIcon name="timer" />
                  {' '}
                  {formatNumber(this.calcTotal())}
                  h
                </Text>
                <Text label>
                  R$
                  {' '}
                  {this.state.showCash ? formatNumber(this.calcTotal() * cash) : <StyledIcon name="eye" />}
                  {' '}
                  <StyledIcon name="cash" />
                </Text>
              </Card>
              {/* TABLE DATA */}
              <TableHeader />
              <Table month={month} />
              <Button onPress={() => navigate('Today')}>HOJE</Button>
            </Wrapper>
          </View>
        </List>
      </View>
    );
  }
}


LoadScreen.propTypes = {
  navigation: objectOf(any).isRequired,
  registry: objectOf(any).isRequired,
};

export default connect(state => state)(LoadScreen);
