import styled from 'styled-components/native';

import theme from '../theme';

const Loader = styled.ActivityIndicator`
flex: 1;
`;

Loader.defaultProps = {
  color: theme.action,
  size: 'large',
}

export default Loader;