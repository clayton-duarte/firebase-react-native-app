import styled from 'styled-components/native';
import { Icon } from 'native-base';
import React from 'react';

const StyledIcon = styled(Icon)`
background-color: ${({ theme }) => theme.bg_secondary};
color: ${({ theme }) => theme.secondary};
left: ${({ size }) => size - 4}%;
${({ theme }) => theme.shadow};
border-radius: 10px;
text-align: center;
position: absolute;
font-size: 16px;
padding: 2px;
height: 20px;
width: 20px;
top: 0px;
`;

const Outside = styled.View`
background-color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.shadow};
flex-direction: row;
position: relative;
border-radius: 6px;
overflow: hidden;
height: 12px;
margin: 4px;
`;

const Inside = styled.View`
background-color: ${({ theme }) => theme.action};
width: ${({ size }) => size}%;
`;

const View = styled.View``;

const Logo = ({ size }) => (
  <View>
    <Outside>
      <Inside size={size} />
    </Outside>
    <StyledIcon size={size} name='walk' />
  </View>
);

export default Logo;