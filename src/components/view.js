import styled from 'styled-components/native';
import { Constants } from 'expo';

export default styled.View`
border-top-width: ${({ inset }) => (!inset ? Constants.statusBarHeight : 0)};
background-color: ${({ theme }) => theme.bg_secondary};
padding: ${({ inset }) => (inset ? '12px 0' : 0)};
border-color: ${({ theme }) => theme.action};
justify-content: space-between;
align-items: stretch;
flex: 1;
`;
