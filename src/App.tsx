import React, { ReactElement, useState } from "react";
import './App.less';
import Root from './components/Root/Root';
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
import { Box, PaletteMode, ThemeProvider } from "@mui/material";
import { theme } from './themes/theme';

function App(): ReactElement {
  const valuesFromStorage = loadDataFromStorage();
  const [mode, setMode] = useState<PaletteMode>('light');

  const handleToggleMode = (): void => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  }

  const store = new Store(
    !isNil(valuesFromStorage) ? valuesFromStorage : InitialValues
  );

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme(mode)}>
        <Box sx={{ backgroundColor: 'background.paper' }}>
          <Header mode={mode} toggle={handleToggleMode} />
          <TopBanner />
          <main className="App">
            <Root />
          </main>
        </Box>
      </ThemeProvider>
    </StoreContext.Provider>
  );
}

export default App;
