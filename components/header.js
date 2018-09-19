import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { Icon, Button } from 'native-base';
import React from 'react';

import Text from './text';
import Logo from './logo';
import Row from './row';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.action};
font-size: 20px;
`;

const StyledRow = styled(Row)`
${({ theme, underline }) => underline ? theme.shadow : ''};
background-color: ${({ theme }) => theme.bg_primary};
justify-content: space-between;
border-right-width: 0;
`;

const Header = ({ navigation: { navigate, openDrawer }}) => (
  <StyledRow underline>
    <Button transparent onPress={openDrawer}>
      <StyledIcon name='menu' />
    </Button>
    <StyledRow>
      <Logo size={20}/>
      <Text label>MEU PONTO VIRTUAL</Text>
    </StyledRow>
    <Button transparent onPress={() => navigate('Profile')}>
      <StyledIcon name='person' />
    </Button>
  </StyledRow>
);

export default (withNavigation(Header));