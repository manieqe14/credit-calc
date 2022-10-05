import { useState } from "react";
import "./App.css";
import Credit from "./components/Credit/Credit";
import Card from "./components/UI/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showCredit, setShowCredit] = useState(false);

  const showModule = () => {
    showCredit ? setShowCredit(false) : setShowCredit(true);
  };

  return (
    <div className="App">
      <Card>
        <h2 onClick={showModule}>Kalkulator rat kredytu</h2>
        <Credit />
      </Card>
      {/* <Card>
        <Salary />
      </Card> */}
    </div>
  );
}

export default App;
