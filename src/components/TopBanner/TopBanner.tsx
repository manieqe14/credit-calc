import { BannerStyle, BannerWrapper } from './TopBanner.styles';
import { Box } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import BannerIcon from '../../view/bannerIcon/BannerIcon';
import { useStore } from '../../context/store.context';
import { observer } from 'mobx-react-lite';

const TopBanner = (): ReactElement => {
  const store = useStore();
  const { error, message, showBanner, hideBanner } = store;

  useEffect(() => {
    if (showBanner) {
      setTimeout(() => {
        hideBanner();
      }, 2000);
    }
  }, [showBanner]);

  return (
    <Box sx={BannerWrapper(showBanner)}>
      {showBanner ? (
        <Box sx={BannerStyle}>
          <BannerIcon variant={error ? 'fail' : 'success'} />
          {error ? message.fail : message.success}
        </Box>
      ) : null}
    </Box>
  );
};

export default observer(TopBanner);
