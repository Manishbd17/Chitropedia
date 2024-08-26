// material-ui
import { useMediaQuery } from '@mui/material';


import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
