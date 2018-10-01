import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React from 'react';

// SETUP
import 'moment/locale/pt-br';
import moment from 'moment';

import ConnectedApp from './src/screens';
import defaultStore from './src/store';
import defaultTheme from './src/theme';

moment.locale('pt-br');

// CONNECTED APP
export default () => {
  console.disableYellowBox = true;
  return (
    <StoreProvider store={defaultStore}>
      <ThemeProvider theme={defaultTheme}>
        <ConnectedApp />
      </ThemeProvider>
    </StoreProvider>
  );
};
