import styled from 'styled-components/native';
import React from 'react';

const Text = styled.Text`
color: ${({ theme, label, title }) => (label || title) ? theme.secondary : theme.primary};
text-align: ${({ center, title }) => (center || title) ? 'center' : 'left'};
font-weight: ${({ label, title }) => (label || title) ? 'bold' : 'normal'};
letter-spacing: ${({ label, title }) => (label || title) ? 2 : 0}px;
font-size: ${({ label }) => label ? 12 : 16}px;
margin: ${({ title }) => title ? 0 : 4}px;
`

const View = styled.View`
border-radius: ${({ theme }) => theme.radius};
${({ theme }) => theme.shadow};
margin: 4px;
`;

export default props => {
  if (props.title) return <View><Text {...props}/></View>;
  return <Text {...props}/>;
};