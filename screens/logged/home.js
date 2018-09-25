import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { insertNewRegistry, sendPushNotification } from '../../actions';
import TableHeader from '../../components/tableHeader';
import Table from '../../components/registryTable';
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
      const { registry: { history, days, profile } } = this.props;
      if (!days.length) return { time: '--', fromNow: '--'};
      const today = history[days[0]];
      if (!today) return { time: '--', fromNow: '--'};
      const { lunch } = calcDuration(today);
      const defaultLunch = moment.duration(profile.lunch, 'm').asHours();
      const todaysLunch = lunch ? lunch : defaultLunch;
      const defaultJourney = profile.journey;
      const time = moment(today[0].timestamp).add((defaultJourney + todaysLunch), 'hours').format('H:mm');
      const fromNow = moment(time, 'H:mm').fromNow();
      return { time, fromNow };
    };
    this.notifyGoHome = () => {
      const { notification: { token }, registry: { profile: { journey } } } = this.props;
      this.props.sendPushNotification({
        token,
        title: 'FIM DO EXPEDIENTE',
        body: `Você já trabalhou as suas ${journey} horas diárias. Hora de ir para casa.`
      });
    }
  }
  
  componentDidUpdate() {
    const { now } = this.props;
    if (now && this.goHome().time === moment(now, 'x').format('H:mm')) this.notifyGoHome();
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
              SAÍDA {this.goHome().time} ({this.goHome().fromNow})
            </Text>
          </Wrapper>
          <Clock onPress={this.newRegistry}></Clock>
          <Wrapper>
            <TableHeader />
            <Table depth={1} />
            <Button onPress={() => navigate('Registry')}>MEUS REGISTROS</Button>
          </Wrapper>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ insertNewRegistry, sendPushNotification }, dispatch);
export default connect(state => state, mapDispatchToProps)(Today);