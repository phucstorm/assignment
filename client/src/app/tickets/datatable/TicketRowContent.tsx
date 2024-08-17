import { Ticket, TicketStatus } from '@acme/shared-models';
import { Box, Link, Typography } from '@mui/material';
import { Tag } from 'client/src/components/Tag';
import { UserInfo } from 'client/src/components/UserInfo';
import { useAppSelector } from 'client/src/hooks';
import React from 'react';
import { TicketTableColumns } from './TicketTable';

interface TicketRowContentProps extends TicketTableColumns {
  ticket: Ticket;
}

const TicketRowContent: React.FC<TicketRowContentProps> = ({
  columnKey,
  align,
  ticket,
}) => {
  const users = useAppSelector((state) => state.users.list);
  switch (columnKey) {
    case 'id':
      return (
        <Link href={`/${ticket.id}`} underline="hover">
          {ticket.id}
        </Link>
      );
    case 'description':
      return (
        <Typography variant="body2" noWrap>
          {ticket.description}
        </Typography>
      );
    case 'completed':
      const label = ticket.completed ? TicketStatus.DONE : TicketStatus.TODO;
      const color = ticket.completed ? 'success' : 'default';
      return <Tag label={label} color={color} />;
    case 'assigneeId':
      const assignee = users?.find((user) => user.id === ticket.assigneeId);
      return (
        <Box display="flex" flexDirection={'row'} justifyContent={align}>
          <UserInfo name={assignee ? assignee.name : 'Unassign'} />
        </Box>
      );
    default:
      return null;
  }
};

export default TicketRowContent;
