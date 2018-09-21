import styled from 'styled-components/native';

import Day from './day';

export const setColor = ({ length, index, total, theme }) => {
  // HIGHTLIGHT TOTAL
  if (total) return theme.action;
  // HIGHTLIGHT ODD REGISTRY
  if (length % 2) return theme.warn;
  // HIGHTLIGHT FIRST AND LAST REGISTRY
  if (index === 0 || index + 1 === length) return theme.primary;
  return theme.secondary;
}

export default styled(Day)`
color:  ${({ length, index, total, theme }) => setColor({ length, index, total, theme })};
background-color: ${({ theme, total }) => total ? theme.bg_secondary : theme.bg_primary};
border-left-width: ${({ index, total }) => index || total ? 1 : 0}px;
border-color: ${({ theme }) => theme.bg_secondary};
letter-spacing: 2px;
text-align: center;
font-weight: bold;
font-size: 12px;
`;