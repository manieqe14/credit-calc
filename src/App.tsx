import React, { ReactElement } from 'react';
import './App.less';
import Root from './components/Root/Root';
import { theme } from './themes/theme';
import { ThemeProvider } from '@mui/material';

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <main className="App">
        <h1>Credit calculator</h1>
        <Root />
      </main>
    </ThemeProvider>
  );
}

export default App;
