import { Helmet } from 'react-helmet';
import { useEffect, useState, useContext } from 'react';
import appContext from 'src/store/app_context';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import EventsToolbar from 'src/components/events/EventsToolbar';
import EventListResults from 'src/components/events/EventListResults';

const Events = (props) => {
  const { state, dispatchStore } = useContext(appContext);
  const [input, setInput] = useState(0);
  const [eventTypeList, setEventTypeList] = useState([]);

  const updateInput = async (value) => {
    const filtered = state.events.filter(
      (event) => event.eventTypeId === value
    );
    let filteredEvents = value == 0 ? state.events : filtered;

    dispatchStore({
      type: 'FILTER_EVENTS',
      payload: {filteredEvents}
    });
    setInput(value);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspEvents = await axios.get(
        'http://localhost:5000/api/events',
        config
      );

      const rspEventTypes = await axios.get(
        'http://localhost:5000/api/event-types',
        config
      );

      const fetchedEvents = await rspEvents.data;
      const fetchedEventTypes = await rspEventTypes.data;
      const filteredEvents = fetchedEvents.filter(
        (el) =>
          (el.dormitoryId == localStorage.getItem('dormitoryId')) &
          (el.userId !== localStorage.getItem('id'))
      );

      setEventTypeList(fetchedEventTypes);

      dispatchStore({
        type: 'CHANGE_EVENTS',
        payload: {events: filteredEvents}
      });
      
      dispatchStore({
        type: 'FILTER_EVENTS',
        payload: {filteredEvents: filteredEvents}
      });

    };
    fetchEvents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Događaji</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <EventsToolbar
            input={input}
            onChange={updateInput}
            eventTypeList={eventTypeList}
          />
          <Box sx={{ pt: 3 }}>
            <EventListResults
              eventList={state.filteredEvents}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Events;
