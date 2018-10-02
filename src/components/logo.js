import styled from 'styled-components/native';
import { number } from 'prop-types';
import { Icon } from 'native-base';
import React from 'react';


const StyledIcon1 = styled(Icon)`
color: ${({ theme }) => theme.warn};
left: ${({ size }) => size * 0.1}px;
top: ${({ size }) => size * 0.05}px;
font-size: ${({ size }) => size}px;
position: absolute;
align-self: center;
`;

const StyledIcon2 = styled(StyledIcon1)`
color: ${({ theme }) => theme.secondary};
left: ${({ size }) => size * 0.05}px;
top: 0;
`;

const StyledIcon3 = styled(StyledIcon1)`
color: ${({ theme }) => theme.action};
top: ${({ size }) => size * -0.05}px;
left: 0;
`;

const Row = styled.TouchableOpacity`
height: ${({ size }) => size}px;
width: ${({ size }) => size}px;
flex-direction: row;
position: relative;
margin: 0 auto;
`;

const Logo = ({ size }) => (
  <Row size={size}>
    <StyledIcon1 size={size} name="timer" />
    <StyledIcon2 size={size} name="timer" />
    <StyledIcon3 size={size} name="timer" />
  </Row>
);

Logo.propTypes = {
  size: number.isRequired,
};

export default Logo;
