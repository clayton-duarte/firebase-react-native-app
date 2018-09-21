import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Table from '../../components/registryTable';
import { insertNewRegistry } from '../../actions';
import Progress from '../../components/progress';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Header from '../../components/header';
import Clock from '../../components/clock';
import { calcDuration } from '../../utils';
import View from '../../components/view';
import Text from '../../components/text';


class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newRegistry = () => {
      const { registry } = this.props;
      this.props.insertNewRegistry({ registry })
    };
    this.goHome = () => {
      const { registry: { history, days } } = this.props;
      const today = history[days[0]];
      const { lunch } = calcDuration(today);
      return today[0] ? moment(today[0].timestamp).add(9, 'hours').subtract((1 - lunch), 'hours').format('H:mm[h]') : '--';
    }
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return(
      <View>
        <Header />
        <View inset>
          <Wrapper>
            {/* SHOW TODAY DATE */}
            <Text title>HOJE</Text>
            <Text label center>{moment().format('dddd DD/MM/YYYY').toUpperCase()}</Text>
            {/* SHOW TODAY PROGRESS */}
            <Progress />
            {/* MORE INFO */}
            <Text label center>
              SAÍDA PREVISTA {this.goHome()}
            </Text>
          </Wrapper>
          <Clock onPress={this.newRegistry}></Clock>
          <Wrapper>
            <Text title>ÚLTIMOS REGISTROS</Text>
            <Table depth={1} />
            <Button onPress={() => navigate('Registry')}>MEUS REGISTROS</Button>
          </Wrapper>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ insertNewRegistry }, dispatch);
export default connect(state => state, mapDispatchToProps)(Today);