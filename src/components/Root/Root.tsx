import { ReactElement, useMemo, useState } from 'react';
import { Options } from '../Options/Options';
import { Overpayments } from '../Overpayments/Overpayments';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
  LineElement,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useDataForChart from '../../Utils/Hooks/useDataForChart';
import { OptionsObj, OverpaymentDate, UserInputs } from '../types';
import useInstallmentsCount from '../../Utils/Hooks/useInstallmentsCount';
import Summary from '../Summary/Summary';
import Inputs from '../Inputs/Inputs';
import { InputDataContext } from '../../context/InputDataContext';
import { InitialValues } from '../../Utils/initialValues';
import { Grid } from '@mui/material';
import { generateDatesArray } from '../../Utils/generateDatesArray';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

const Root = (): ReactElement => {
  const [userInputs, setUserInputs] = useState<UserInputs>(
    InitialValues.formValues
  );
  const [options, setOptions] = useState<OptionsObj>(InitialValues.options);
  const [overpaymentDates, setOverpaymentDates] = useState<OverpaymentDate[]>(
    []
  );

  const overpaymentDatesHandler = (dates: OverpaymentDate[]): void =>
    setOverpaymentDates(dates);

  // TODO fetch current WIBOR
  // TODO overpayment number of occurrences switch
  // TODO translation
  // TODO custom start date -> hint -> today
  // TODO wakacje kredytowe
  // TODO options provider
  // TODO save data in storage

  const dates = useMemo<Date[]>(
    () => generateDatesArray(options.startDate, userInputs.period.value),
    [userInputs.period.value, options.startDate]
  );

  const { installments, overpaymentsTotal } = useInstallmentsCount({
    dates,
    userInputs,
    options,
    overpaymentDates,
  });
  const chartData = useDataForChart({ installments, options });

  return (
    <InputDataContext.Provider
      value={{
        formValues: userInputs,
        options,
        overpaymentDatesHandler,
      }}
    >
      <Grid container spacing={2}>
        <Inputs setUserInputs={setUserInputs} />
        <Options setOptionsHandler={setOptions} />
        <Overpayments endDate={dates.at(-1) ?? new Date()} />
        <Summary
          installments={installments}
          overpaymentsTotal={overpaymentsTotal}
        />
        <Line {...chartData} />
      </Grid>
    </InputDataContext.Provider>
  );
};

export default Root;
