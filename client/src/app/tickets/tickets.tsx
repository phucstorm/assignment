import { Box, Button } from '@mui/material';
import { Layout } from 'client/src/components/Layout';
import { useState } from 'react';
import TicketTable, { TicketTableColumns } from './datatable/TicketTable';
import CreateTicketModal from './modal/CreateTicketModal';

const ticketColumns: TicketTableColumns[] = [
  {
    columnKey: 'id',
    columnName: 'Ticket ID',
    width: '10%',
  },
  {
    columnKey: 'description',
    columnName: 'Description',
    width: '70%',
  },
  { columnKey: 'completed', columnName: 'Status', width: '10%', align: 'center' },
  { columnKey: 'assigneeId', columnName: 'Assignee', width: '10%', align: 'center' },
];

export function Tickets() {
  const [openCreateTicketDialog, setOpenCreateTicketDialog] = useState(false);

  const onCloseDialog = async () => {
    setOpenCreateTicketDialog(false);
  };

  return (
    <Layout
      title="Ticketing App"
      pageAction={
        <Box>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpenCreateTicketDialog(true)}
          >
            Create
          </Button>
        </Box>
      }
    >
      <TicketTable columns={ticketColumns} />
      <CreateTicketModal
        open={openCreateTicketDialog}
        onClose={onCloseDialog}
      />
    </Layout>
  );
}

export default Tickets;
