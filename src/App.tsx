import React, { ReactElement } from 'react';
import './App.less';
import Credit from './components/Credit/Credit';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(): ReactElement {
  return (
    <main className="App">
      <h1>Kalkulator rat kredytu</h1>
      <Credit />
    </main>
  );
}

export default App;
