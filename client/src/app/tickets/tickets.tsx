import { Box, Button } from '@mui/material';
import { Layout } from 'client/src/components/Layout';
import { useState } from 'react';
import TicketTable, { TicketTableColumns } from './datatable/TicketTable';
import CreateTicketModal from './modal/CreateTicketModal';
import AddIcon from '@mui/icons-material/Add';

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
       
          <Button
            variant="contained"
            onClick={() => setOpenCreateTicketDialog(true)}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
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
