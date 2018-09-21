import React, { Component } from 'react';

import Table from '../../components/registryTable';
import Wrapper from '../../components/wrapper';
import Header from '../../components/header';
import Button from '../../components/button';
import List from '../../components/list';
import Text from '../../components/text';

class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return(
      <List>
        <Header />
        <Wrapper>
          <Text title>ÚLTIMOS 30 DIAS</Text>
          <Table />
          <Button onPress={() => navigate('Today')}>HOJE</Button>
        </Wrapper>
      </List>
    );
  }
}

export default LoadScreen;