import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React from 'react';

// SETUP
import 'moment/locale/pt-br';
import moment from 'moment';
moment.locale('pt-br');

import ConnectedApp from './screens';
import defaultStore from './store';
import defaultTheme from './theme';

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
}