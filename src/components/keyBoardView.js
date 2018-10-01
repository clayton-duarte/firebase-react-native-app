import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

const KeyboardView = styled(KeyboardAwareScrollView)`
background-color: ${({ theme }) => theme.bg_secondary};
padding: 12px 0;
flex: 1;
`;

KeyboardView.defaultProps = {
  resetScrollToCoords: { x: 0, y: 0 },
  extraScrollHeight: 64,
  enableOnAndroid: true,
  contentContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
};

export default KeyboardView;
