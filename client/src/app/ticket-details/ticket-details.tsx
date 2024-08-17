import { TicketStatus } from '@acme/shared-models';
import { Box, Stack, Typography } from '@mui/material';
import useTicketApi from 'client/src/api/ticketApi';
import {
  SelectAssignee,
  SelectTicketStatus,
} from 'client/src/components/Select';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface TicketDetailState {
  status: boolean;
  assigneeId: number;
}

export function TicketDetails() {
  const { id } = useParams();
  const { getDetail, updateStatus, assign } = useTicketApi();
  const { data, isFetchedAfterMount } = getDetail(id ?? '');
  const [ticketState, setTicketState] = useState<TicketDetailState>({
    status: false,
    assigneeId: 0,
  });

  useEffect(() => {
    setTicketState({
      status: Boolean(data?.completed),
      assigneeId: data?.assigneeId ?? 0,
    });
  }, [data]);

  const handleChangeStatus = (status: TicketStatus) => {
    const newStatus = status === TicketStatus.DONE;
    updateStatus.mutate({ id: id ?? '', status: newStatus });
  };

  const handleChangeAssignee = (assigneeId: number) => {
    setTicketState({
      ...ticketState,
      assigneeId: assigneeId,
    });
    assign.mutate({ id: id ?? '', assigneeId: assigneeId });
  };

  const renderTicketStatus = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <SelectTicketStatus
          value={ticketState.status ? TicketStatus.DONE : TicketStatus.TODO}
          onChange={handleChangeStatus}
        />
      </Box>
    );
  };

  const renderAssignee = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <SelectAssignee
          value={ticketState.assigneeId}
          onChange={handleChangeAssignee}
        />
      </Box>
    );
  };

  if (!isFetchedAfterMount) {
    return <></>;
  }

  return (
    <Box>
      <Typography variant="h4" noWrap>
        {data?.description}
      </Typography>
      <Stack direction="row" spacing={4}>
        {renderTicketStatus()}
        {renderAssignee()}
      </Stack>
    </Box>
  );
}

export default TicketDetails;
