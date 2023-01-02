import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Subtitle } from '../../view/titles/titles';
import { useStore } from '../../context/store.context';
import ListView from '../../view/list/ListView';
import ListViewItem from '../../view/list/ListViewItem';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { InputIconStyle } from '../Input/Input.styles';
import { VacationDate } from '../../view/list/ListView.types';
import { dateToId, idToDate } from '../../Utils/dateToId';
import { numberToMonth } from '../../Utils/numberToMonth';
import { isMobile } from '../../Utils/isMobile';

const Holidays: React.FC = () => {
  const store = useStore();
  const { options } = store;
  const { t, i18n } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [vacationMonths, setVacationMonths] = useState<VacationDate[]>(
    options.vacationMonths
  );

  const handleCloseDialog = (): void => {
    setShowDialog(false);
    store.setOptions({ vacationMonths });
  };

  const handleDeleteVacation = (id: string): void => {
    const transformedVacationDate = idToDate(id);
    const filteredMonths = vacationMonths.filter(
      (item) =>
        item.month !== transformedVacationDate.month ||
        item.year !== transformedVacationDate.year
    );

    setVacationMonths(filteredMonths);
    store.setOptions({ vacationMonths: filteredMonths });
  };

  const addDialog = (): ReactElement => {
    return (
      <Dialog open={showDialog}>
        <DialogContent>
          <DialogContentText>
            <ListView
              row={isMobile() ? 3 : 5}
              onClick={(id: string) =>
                setVacationMonths([...vacationMonths, idToDate(id)])
              }
            >
              {store.dates.map((date) => (
                <ListViewItem
                  active={
                    vacationMonths.find(
                      (vacationDate) =>
                        vacationDate.month === date.getMonth() &&
                        vacationDate.year === date.getFullYear()
                    ) !== undefined
                  }
                  id={dateToId(date)}
                >
                  <ListViewItem.Title>
                    {`${numberToMonth(
                      date.getMonth(),
                      i18n.language,
                      false
                    )}-${date.getFullYear()}`}
                  </ListViewItem.Title>
                </ListViewItem>
              ))}
            </ListView>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>{t('Cancel')}</Button>
          <Button onClick={handleCloseDialog}>{t('OK')}</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      {showDialog ? addDialog() : null}
      <Subtitle variant="overline">{t('Vacation months')}</Subtitle>
      <AddIcon sx={InputIconStyle} onClick={() => setShowDialog(true)} />
      <ListView row={2} onDelete={handleDeleteVacation}>
        {options.vacationMonths.map((vacationDate) => (
          <ListViewItem id={dateToId(vacationDate)}>
            <ListViewItem.Title>
              {numberToMonth(vacationDate.month, i18n.language)}
            </ListViewItem.Title>
            <ListViewItem.Info>{vacationDate.year}</ListViewItem.Info>
          </ListViewItem>
        ))}
      </ListView>
    </Box>
  );
};

export default Holidays;
