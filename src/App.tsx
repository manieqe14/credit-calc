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
import Store from './store/store';
import { InitialValues } from './Utils/initialValues';
import { isNil } from 'ramda';
import { loadDataFromStorage } from './Utils/dataFromStorage';
import StoreContext from './context/store.context';
import TopBanner from './components/TopBanner/TopBanner';

function App(): ReactElement {
  const valuesFromStorage = loadDataFromStorage();

  const store = new Store(
    !isNil(valuesFromStorage) ? valuesFromStorage : InitialValues
  );

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <TopBanner />
        <main className="App">
          <Root />
        </main>
      </ThemeProvider>
    </StoreContext.Provider>
  );
}

export default App;
