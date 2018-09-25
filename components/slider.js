import styled from 'styled-components/native';
import { Platform } from 'react-native'

import theme from '../theme';

const Slider = styled.Slider`
margin: ${Platform.select({ ios: '0', android: '12px 0' })};
${({ theme }) => theme.shadow};
`;

Slider.defaultProps = {
  // maximumTrackTintColor: theme.bg_primary,
  minimumTrackTintColor: theme.secondary,
  thumbTintColor: theme.action,
}

export default Slider;