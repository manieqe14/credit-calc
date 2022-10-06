import React, { ReactElement, useState } from 'react';
import './App.less';
import Credit from './components/Credit/Credit';
import Card from './components/UI/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(): ReactElement {
  const [showCredit, setShowCredit] = useState(false);

  const showModule = (): void => {
    showCredit ? setShowCredit(false) : setShowCredit(true);
  };

  return (
    <div className="App">
      <Card>
        <h1 onClick={showModule}>Kalkulator rat kredytu</h1>
        <Credit />
      </Card>
      {/* <Card>
        <Salary />
      </Card> */}
    </div>
  );
}

export default App;
