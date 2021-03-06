import styled from 'styled-components/native';
import React from 'react';

const Touch = styled.TouchableOpacity`
background-color: ${({ theme, secondary, link }) => ((secondary || link) ? 'transparent' : theme.action)};
border-width: ${({ secondary }) => (secondary ? 2 : 0)}px;
${({ theme, link }) => (link ? '' : theme.shadow)};
border-radius: ${({ theme }) => theme.radius};
flex: ${({ flex }) => flex || 'auto'};
padding: 12px;
margin: 4px;
`;

const Text = styled.Text`
color: ${({ theme, secondary, link }) => ((secondary || link) ? theme.action : theme.bg_primary)};
${({ theme, secondary, link }) => ((secondary || link) ? '' : theme.text_shadow)};
font-family: custom-font-bold;
letter-spacing: 2px;
text-align: center;
font-size: 16px;
`;

export default props => (<Touch {...props}><Text {...props} /></Touch>);
