import { TicketStatus } from "@acme/shared-models";
import { Box, Button, Stack, Typography } from "@mui/material";
import useTicketApi from "client/src/api/ticketApi";
import {
  SelectAssignee,
  SelectTicketStatus,
} from "client/src/components/Select";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface TicketDetailState {
  status: boolean;
  assigneeId: number;
}

export function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDetail, updateStatus, assign } = useTicketApi();
  const { data, isFetchedAfterMount } = getDetail(id ?? "");
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
    updateStatus.mutate({ id: id ?? "", status: newStatus });
  };

  const handleChangeAssignee = (assigneeId: number) => {
    setTicketState({
      ...ticketState,
      assigneeId: assigneeId,
    });
    assign.mutate({ id: id ?? "", assigneeId: assigneeId });
  };

  const renderTicketStatus = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
      >
        <Box sx={{ width: 120 }}>
          <Typography variant="h6">Status</Typography>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <SelectTicketStatus
            value={ticketState.status ? TicketStatus.DONE : TicketStatus.TODO}
            onChange={handleChangeStatus}
          />
        </Box>
      </Stack>
    );
  };

  const renderAssignee = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
      >
        <Box sx={{ width: 120 }}>
          <Typography variant="h6">Assignee</Typography>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <SelectAssignee
            value={ticketState.assigneeId}
            onChange={handleChangeAssignee}
          />
        </Box>
      </Stack>
    );
  };

  if (!isFetchedAfterMount) {
    return <></>;
  }

  return (
    <Stack gap="1rem">
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => navigate("/", { replace: true })}
        >
          Back
        </Button>
      </Box>

      <Stack spacing={2}>
        {renderTicketStatus()}
        {renderAssignee()}
      </Stack>
      <Stack gap="0.5rem">
        <Typography variant="h6" noWrap>
          Description
        </Typography>
        <Typography variant="body1" noWrap>
          {data?.description}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default TicketDetails;
