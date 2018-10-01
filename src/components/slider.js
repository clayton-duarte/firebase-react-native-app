import styled from 'styled-components/native';
import { Platform } from 'react-native';

import theme from '../theme';

const Slider = styled.Slider`
margin: ${Platform.select({ ios: '0', android: '12' })}px 4px;
${theme.shadow};
`;

Slider.defaultProps = {
  minimumTrackTintColor: theme.secondary,
  thumbTintColor: theme.action,
};

export default Slider;
