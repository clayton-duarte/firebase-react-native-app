import DateTimePicker from 'react-native-modal-datetime-picker';
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
import Row from '../../components/row';
import Fab from '../../components/fab';

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
      const monthName = moment(month, 'YYYYMM').format('MMMM').toUpperCase();
      this.setState({ month, monthName, loading: false });
    };
    this.toogleShowCash = () => this.setState(prevState => ({ showCash: !prevState.showCash }));
    this.calcTotal = () => {
      const { history, days } = this.props.registry;
      if (!days.length) return 0;
      const currentDays = filterDaysByMonth(days, this.state.month);
      const sum = currentDays.reduce((acc, cur) => {
        const total = Number(calcDuration(history[cur]).total);
        return acc + total;
      }, 0);
      return sum;
    };
    this.openDatePicker = () => this.setState({ datePicker: true });
    this.onCancel = () => this.setState({ datePicker: false });
    this.onConfirm = async (date) => {
      await this.onCancel();
      const day = moment(date).format('YYYYMMDD');
      this.props.navigation.navigate('Edit', { day });
    };
  }

  componentDidMount() {
    this.setMonthToShow();
  }

  componentDidUpdate(prevProps) {
    const month = this.props.navigation.getParam('month');
    const prevMonth = prevProps.navigation.getParam('month');
    if (month !== prevMonth) this.setMonthToShow();
  }

  render() {
    const { navigation: { navigate, openDrawer }, registry: { profile: { cash } } } = this.props;
    const { month, loading } = this.state;
    if (loading) return <View><Loader /></View>;
    return (
      <View>
        {/* HEADER AND TITLE */}
        <Header />
        <List>
          <View inset>
            <Wrapper>
              <Text title>{this.state.monthName}</Text>
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
              <Row>
                <Button flex={1} secondary onPress={() => openDrawer()}>VER MAIS</Button>
                <Button flex={1} onPress={() => navigate('Today')}>HOJE</Button>
              </Row>
            </Wrapper>
          </View>
        </List>
        <Fab icon="create" onPress={this.openDatePicker} />
        <DateTimePicker
          titleIOS="Escolha um dia para adicionar"
          isVisible={this.state.datePicker}
          onConfirm={this.onConfirm}
          confirmTextIOS="Confirmar"
          onCancel={this.onCancel}
          cancelTextIOS="Cancelar"
          mode="date"
        />
      </View>
    );
  }
}


LoadScreen.propTypes = {
  navigation: objectOf(any).isRequired,
  registry: objectOf(any).isRequired,
};

export default connect(state => state)(LoadScreen);
