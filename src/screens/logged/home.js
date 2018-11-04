import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getDistance } from 'geolib';
import moment from 'moment';
import {
  objectOf, any, func, string,
} from 'prop-types';

import { insertNewRegistry, sendPushNotification, registerWorkplace } from '../../actions';
import { calcDuration, getPosition } from '../../utils';
import TableHeader from '../../components/tableHeader';
import Table from '../../components/registryTable';
import Progress from '../../components/progress';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Header from '../../components/header';
import Clock from '../../components/clock';
import View from '../../components/view';
import Text from '../../components/text';
import Fab from '../../components/fab';

const StrechedView = styled.View`
justify-content: center;
align-items: center;
flex: 1;
`;

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newRegistry = () => {
      const { registry, navigation } = this.props;
      this.props.insertNewRegistry({ registry, router: navigation });
    };
    this.goHome = () => {
      // SETUP
      const { registry: { history, days, profile } } = this.props;
      const exception = { time: '--', fromNow: '--' };
      // CATCH
      if (!days.length) return exception;
      if (days[0] !== moment().format('YYYYMMDD')) return exception;
      const today = history[days[0]];
      if (!today) return exception;
      // CALCS
      const { lunch } = calcDuration(today);
      const defaultLunch = moment.duration(profile.lunch, 'm').asHours();
      const todaysLunch = lunch || defaultLunch;
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
        body: `Você já trabalhou as suas ${journey} horas diárias. Hora de ir para casa.`,
      });
    };
    this.registerWorkplace = () => {
      const { profile } = this.props.registry;
      this.props.registerWorkplace({ profile });
    };
    this.getDistance = async () => {
      const myPosition = await getPosition();
      const { workplace } = this.props.registry.profile;
      if (!workplace) return false;
      const distance = await getDistance(myPosition.coords, workplace.coords).toString();
      if (!distance) return false;
      return this.setState({ distance });
    };
    this.startGPS = () => {
      const gps = setInterval(this.getDistance, 5000);
      this.setState({ gps });
    };
    this.stopGPS = () => clearInterval(this.state.gps);
  }

  componentDidMount() {
    this.startGPS();
  }

  componentDidUpdate() {
    const { now } = this.props;
    if (now && this.goHome().time === moment(now, 'x').format('H:mm')) this.notifyGoHome();
  }

  componentWillUnmount() {
    this.stopGPS();
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return (
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
              SAÍDA
              {' '}
              {this.goHome().time}
              {' '}
              (
              {this.goHome().fromNow}
              )
            </Text>
          </Wrapper>
          <StrechedView>
            <Clock onPress={this.newRegistry} />
            <Fab icon="pin" onPress={this.registerWorkplace}>
              {
                this.state.distance && <Text label>{this.state.distance}m</Text>
                }
            </Fab>
          </StrechedView>
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

Today.propTypes = {
  notification: objectOf(any).isRequired,
  sendPushNotification: func.isRequired,
  navigation: objectOf(any).isRequired,
  registerWorkplace: func.isRequired,
  insertNewRegistry: func.isRequired,
  registry: objectOf(any).isRequired,
  now: string.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ insertNewRegistry, sendPushNotification, registerWorkplace }, dispatch);
export default connect(state => state, mapDispatchToProps)(Today);
