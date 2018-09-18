import styled from 'styled-components/native';

export default styled.Text`
color: ${({ theme, label }) => label ? theme.secondary : theme.primary};
text-align: ${({ center }) => center ? 'center' : 'left'};
font-weight: ${({ label }) => label ? 'bold' : 'normal'};
letter-spacing: ${({ label }) => label ? 2 : 0}px;
font-size: ${({ label }) => label ? 12 : 16}px;
font-family: sans-serif;
margin: 4px;
`;