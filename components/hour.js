import styled from 'styled-components/native';

import Day from './day';

const setColor = ({ length, index, total, theme }) => {
  if (total) return theme.action;
  if (length % 2) return theme.warn;
  if (index === 0 || index + 1 === length) return theme.primary;
  return theme.secondary;
}

export default styled(Day)`
color:  ${({ length, index, total, theme }) => setColor({ length, index, total, theme })};
background-color: ${({ theme, total }) => total ? theme.bg_secondary : theme.bg_primary};
border-left-width: ${({ index, total }) => index || total ? 1 : 0}px;
position: ${({ total }) => total ? 'absolute' : 'relative'};
font-weight: ${({ total }) => total ? 'bold' : 'normal'};
border-color: ${({ theme }) => theme.bg_secondary};
letter-spacing: ${({ total }) => total ? 2 : 1}px;
font-size: ${({ total }) => total ? 12 : 16}px;
text-align: center;
flex: 0.2;
right: 0;
`;