import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import Row from './row';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.action};
font-size: 20px;
`;

const Text = styled.Text`
color: ${({ theme }) => theme.secondary};
letter-spacing: 2px;
font-weight: bold;
font-size: 16px;
`;

const StyledRow = styled(Row)`
background-color: ${({ theme }) => theme.bg_primary};
justify-content: space-between;
${({ theme }) => theme.shadow};
border-right-width: 0;
`;

const Header = ({ navigation: { navigate, openDrawer }, auth: { user: { displayName } } }) => (
  <StyledRow>
    <Button transparent onPress={() => openDrawer() }>
      <StyledIcon name='menu' />
    </Button>
    <Text>OLÁ {displayName.toUpperCase()}</Text>
    <Button transparent onPress={() => navigate('Profile')}>
      <StyledIcon name='person' />
    </Button>
  </StyledRow>
);

export default connect(state => state)(withNavigation(Header));