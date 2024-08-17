import { Ticket, TicketStatus, TicketTableHead } from '@acme/shared-models';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import useTicketApi from 'client/src/api/ticketApi';
import { SelectTicketStatus } from 'client/src/components/Select';
import React, { useEffect, useState } from 'react';
import TicketRowContent from './TicketRowContent';

export type TicketTableColumns = TicketTableHead & TableCellProps;
interface TicketTableProps {
  columns: TicketTableColumns[];
}

const TicketTable: React.FC<TicketTableProps> = ({ columns }) => {
  const { data = [] } = useTicketApi().getList;
  const [filterState, setFilterState] = useState({
    status: '' as TicketStatus,
  });
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(data);
  }, [data]);

  const handleChangeStatus = (status: TicketStatus) => {
    const newStatus = status === TicketStatus.DONE;
    setFilterState({ status: status as TicketStatus });
    setTickets(
      [...data].filter((ticket) =>
        status === ('' as TicketStatus)
          ? ticket
          : ticket.completed === newStatus
      )
    );
  };

  const renderActions = () => {
    return (
      <Stack direction="row" spacing={2} sx={{ marginY: 2 }}>
        {renderFilterStatus()}
      </Stack>
    ); 
  };

  const renderFilterStatus = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <SelectTicketStatus
          value={filterState.status}
          onChange={handleChangeStatus}
          displayLabel
          allowSelectAll
        />
      </Box>
    );
  };

  const renderTableHead = () => {
    return (
      <TableRow>
        {columns.map(({ columnKey, columnName, width, align = 'left' }) => (
          <TableCell key={columnKey} width={width} align={align}>
            {columnName}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const renderTableBody = () => {
    if (tickets.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            No data
          </TableCell>
        </TableRow>
      );
    }
    return tickets.map((ticket) => (
      <TableRow>
        {columns.map((column) => (
          <TableCell align={column.align}>
            <TicketRowContent ticket={ticket} {...column} />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Stack gap="1rem">
      {renderActions()}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>{renderTableHead()}</TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TicketTable;
