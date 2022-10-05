import { useState } from "react";

export default function Salary() {
  const [skladka, setSkladka] = useState({
    emerytalna: 0,
    rentowa: 0,
    chorobowa: 0,
    zdrowotna: 0,
    dochodowy: 0,
  });
  const [netto, setNetto] = useState(0);

  const countSalary = (brutto) => {
    let emerytalna = brutto.target.value * 9.76 * 0.01;
    let rentowa = brutto.target.value * 1.5 * 0.01;
    let chorobowa = brutto.target.value * 2.45 * 0.01;
    let zdrowotna =
      (brutto.target.value - emerytalna - rentowa - chorobowa) * 0.09;
    let dochodowy =
      (brutto.target.value -
        emerytalna -
        rentowa -
        chorobowa -
        zdrowotna -
        250) *
        0.17 -
      425;
    setSkladka([emerytalna, rentowa, chorobowa, zdrowotna, dochodowy]);
    let neto = emerytalna + rentowa + chorobowa + zdrowotna + dochodowy;
    setNetto(brutto.target.value - neto);
  };

  return (
    <div>
      <h2>Kalkulator wynagrodzeń</h2>
      <form>
        <div>
          <label>Kwota brutto</label>
          <input type="number" step="10" value="7000" onChange={countSalary} />
        </div>
        <div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round">Koszty autorskie</span>
          </label>
        </div>
      </form>
      <div>
        <div>
          <h4>Składka emerytalna</h4>
          <span>{skladka.emerytalna}</span>
        </div>
        <div>
          <h4>Składka rentowa</h4>
          <span>{skladka.rentowa}</span>
        </div>
        <div>
          <h4>Składka chorobowa</h4>
          <span>{skladka.chorobowa}</span>
        </div>
        <div>
          <h4>Składka zdrowotna</h4>
          <span>{skladka.zdrowotna}</span>
        </div>
        <div>
          <h4>Dochodowy</h4>
          <span>{skladka.dochodowy}</span>
        </div>
        <div>
          <h3>Kwota netto</h3>
          <span>{netto}</span>
          <span>PLN</span>
        </div>
      </div>
    </div>
  );
}
