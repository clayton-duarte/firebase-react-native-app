import styled from 'styled-components/native';

import Day from './day';

export default styled(Day)`
background-color: ${({ theme, total }) => total ? theme.bg_secondary : theme.bg_primary};
color:  ${({ theme, total }) => total ? theme.action : theme.primary};
border-left-width: ${({ index, total }) => index || total ? 1 : 0}px;
position: ${({ total }) => total ? 'absolute' : 'relative'};
font-weight: ${({ total }) => total ? 'bold' : 'normal'};
border-color: ${({ theme }) => theme.bg_secondary};
letter-spacing: ${({ total }) => total ? 2 : 1}px;
font-size: ${({ total }) => total ? 12 : 16}px;
text-align: center;
right: 0;
flex: .2;
`;