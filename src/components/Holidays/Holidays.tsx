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
} from '@mui/material';
import { InputIconStyle } from '../Input/Input.styles';
import { dateToId, idToDate } from '../../Utils/dateToId';
import { numberToMonth } from '../../Utils/numberToMonth';
import { isMobile } from '../../Utils/isMobile';
import { HolidayDate } from '../../view/list/ListView.types';
import { sortHolidayMonths } from '../../Utils/sortHolidayMonths';

const Holidays: React.FC = () => {
  const store = useStore();
  const { options } = store;
  const { holidayMonths } = options;
  const { t, i18n } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [months, setMonths] = useState<HolidayDate[]>(holidayMonths);

  const handleCloseDialog = (): void => {
    setShowDialog(false);
    store.setOptions({ holidayMonths: months });
  };

  const handleDeleteMonth = (id: string): void => {
    const transformedHolidayDate = idToDate(id);
    const filteredMonths = months.filter(
      (item) =>
        item.month !== transformedHolidayDate.month ||
        item.year !== transformedHolidayDate.year
    );

    setMonths(filteredMonths);
    store.setOptions({ holidayMonths: filteredMonths });
  };

  const addDialog = (): ReactElement => {
    return (
      <Dialog open={showDialog}>
        <DialogContent>
          <ListView
            row={isMobile() ? 3 : 5}
            onClick={(id: string) =>
              setMonths([...sortHolidayMonths(months), idToDate(id)])
            }
          >
            {store.dates.map((date) => (
              <ListViewItem
                active={
                  months.find(
                    (month) =>
                      month.month === date.getMonth() &&
                      month.year === date.getFullYear()
                  ) !== undefined
                }
                id={dateToId(date)}
                key={dateToId(date)}
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
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setShowDialog(false)}>
            {t('Cancel')}
          </Button>
          <Button color="success" onClick={handleCloseDialog}>
            {t('OK')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      {showDialog ? addDialog() : null}
      <Subtitle id="holiday-months" variant="overline">
        {t('Holiday months')}
      </Subtitle>
      <AddIcon
        aria-labelledby="holiday-months"
        sx={InputIconStyle}
        onClick={() => setShowDialog(true)}
      />
      <ListView
        row={2}
        onDelete={handleDeleteMonth}
        sx={{ maxHeight: '150px', overflowY: 'scroll' }}
      >
        {sortHolidayMonths(holidayMonths).map((holidayDate) => (
          <ListViewItem id={dateToId(holidayDate)} key={dateToId(holidayDate)}>
            <ListViewItem.Title>
              {numberToMonth(holidayDate.month, i18n.language)}
            </ListViewItem.Title>
            <ListViewItem.Info>{holidayDate.year}</ListViewItem.Info>
          </ListViewItem>
        ))}
      </ListView>
    </Box>
  );
};

export default Holidays;
