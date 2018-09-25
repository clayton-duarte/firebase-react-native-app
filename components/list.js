import styled from 'styled-components/native';
import React from 'react';

import View from './view';

const ScrollView = styled.ScrollView``;

ScrollView.defaultProps = {
  contentContainerStyle: {
    alignItems: 'stretch',
  },
}

export default props => (
  <View>
    <ScrollView {...props}/>
  </View>
);