import React, { ReactElement } from 'react';
import './App.less';
import Root from './components/Root/Root';
import { theme } from './themes/theme';
import { ThemeProvider } from '@mui/material';
import { Header } from './components/Header/Header';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Store from "./store/store";
import { InitialValues } from "./Utils/initialValues";


function App(): ReactElement {

  const store = new Store(InitialValues);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="App">
        <Root store={store}/>
      </main>
    </ThemeProvider>
  );
}

export default App;
