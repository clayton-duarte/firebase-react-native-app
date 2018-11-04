import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { objectOf, any } from 'prop-types';
import { Icon, Button } from 'native-base';
import React from 'react';

import { expo as info } from '../../app.json';
import Text from './text';
import Logo from './logo';
import Row from './row';

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.action};
${({ theme }) => theme.text_shadow};
font-size: 20px;
`;

const StyledRow = styled(Row)`
${({ theme, underline }) => (underline ? theme.shadow : '')};
background-color: ${({ theme }) => theme.bg_primary};
justify-content: space-between;
border-right-width: 0;
`;

const StyledText = styled(Text)`
font-size: 10px;
`;

const Header = ({ navigation: { navigate, openDrawer } }) => (
  <StyledRow underline>
    <Button transparent onPress={openDrawer}>
      <StyledIcon name="menu" />
    </Button>
    <StyledRow>
      <Logo size={20} />
      <Text label>
        PONTO VIRTUAL
        {' '}
        <StyledText label>{info.version}</StyledText>
      </Text>
    </StyledRow>
    <Button transparent onPress={() => navigate('Profile')}>
      <StyledIcon name="person" />
    </Button>
  </StyledRow>
);

Header.propTypes = {
  navigation: objectOf(any).isRequired,
};

export default (withNavigation(Header));
