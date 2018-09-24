import styled from 'styled-components/native';

import theme from '../theme';

const Slider = styled.Slider`
${({ theme }) => theme.shadow};
margin: 12px 0;
`;

Slider.defaultProps = {
  // maximumTrackTintColor: theme.bg_primary,
  minimumTrackTintColor: theme.secondary,
  thumbTintColor: theme.action,
}

export default Slider;