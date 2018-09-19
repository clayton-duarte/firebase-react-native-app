import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { Icon, Button } from 'native-base';
import React from 'react';

import Text from './text';
import Row from './row';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.action};
font-size: 20px;
`;

const StyledRow = styled(Row)`
background-color: ${({ theme }) => theme.bg_primary};
justify-content: space-between;
${({ theme }) => theme.shadow};
border-right-width: 0;
`;

const Header = ({ navigation: { navigate, openDrawer }}) => (
  <StyledRow>
    <Button transparent onPress={openDrawer}>
      <StyledIcon name='menu' />
    </Button>
    <Text label>MEU PONTO VIRTUAL</Text>
    <Button transparent onPress={() => navigate('Profile')}>
      <StyledIcon name='person' />
    </Button>
  </StyledRow>
);

export default (withNavigation(Header));