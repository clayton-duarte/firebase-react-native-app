import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React, { Component } from 'react';
import { Font } from 'expo';

// SETUP
import 'moment/locale/pt-br';
import moment from 'moment';

// FONTS
import customFontBold from './assets/fonts/UbuntuMono-Bold.ttf';
import customFont from './assets/fonts/UbuntuMono-Regular.ttf';

// PROVIDERS
import ConnectedApp from './src/screens';
import defaultStore from './src/store';
import defaultTheme from './src/theme';

moment.locale('pt-br');

// CONNECTED APP
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'custom-font-bold': customFontBold,
      'custom-font': customFont,
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    console.disableYellowBox = true;
    if (!this.state.fontLoaded) return null;
    return (
      <StoreProvider store={defaultStore}>
        <ThemeProvider theme={defaultTheme}>
          <ConnectedApp />
        </ThemeProvider>
      </StoreProvider>
    );
  }
}
