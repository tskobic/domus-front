import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import appContext from 'src/store/app_context';
import { useContext } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem
} from '@material-ui/core';

const MyEventsToolbar = ({ input, onChange, eventTypeList, ...props }) => {
  // const { state, dispatchStore } = useContext(appContext);

  // const filterEvents = () => {
  //   const filteredEvents = state.events.filter(
  //     (el) =>
  //       (el.dormitoryId == localStorage.getItem('dormitoryId')) &
  //       (el.userId === localStorage.getItem('id'))
  //   );

  //   dispatchStore({
  //     type: 'FILTER_EVENTS',
  //     payload: {filteredEvents}
  //   });
  // }

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Box
          sx={{
            mr: 1
          }}
        >
        </Box>
        <RouterLink to="new">
          <Button color="primary" variant="contained">
            Novi događaj
          </Button>
        </RouterLink>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                select
                fullWidth
                label="Tip događaja"
                margin="normal"
                variant="outlined"
                value={input}
                onChange={(e) => onChange(e.target.value)}
              >
                <MenuItem key={0} value={0}>
                  Svi
                </MenuItem>
                {eventTypeList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

MyEventsToolbar.propTypes = {
  input: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  eventTypeList: PropTypes.array.isRequired
};

export default MyEventsToolbar;
