import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import store, { userActions } from '../store';
import TicketDetails from './ticket-details/ticket-details';
import { Container } from '@mui/material';

const App = () => {
  const getInitialData = async () => {
    await Promise.all([store.dispatch(userActions.fetchUsers())]);
  };
  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Container fixed>
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </Container>
  );
};

export default App;
