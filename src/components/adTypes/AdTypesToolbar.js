import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button
} from '@material-ui/core';
import DialogBox from './DialogBox';

const AdTypesToolbar = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Novi tip oglasa
        </Button>
      </Box>
      <DialogBox onClose={handleClose} open={open} />
    </Box>
  );
};

AdTypesToolbar.propTypes = {
  input: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  eventTypeList: PropTypes.array.isRequired
};

export default AdTypesToolbar;
