import styled from 'styled-components/native';
import { Constants } from 'expo';

const ListView = styled.ScrollView`
background-color: ${({ theme }) => theme.bg_secondary};
border-top-width: ${Constants.statusBarHeight};
border-color: ${({ theme }) => theme.primary};
padding-bottom: 12px;
`;

ListView.defaultProps = {
  contentContainerStyle: {
    alignItems: 'stretch',
    flex: 1,
  },
}

export default ListView;