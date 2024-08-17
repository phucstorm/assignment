import { TicketStatus } from '@acme/shared-models';
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';

interface SelectTicketStatusProps {
  value: TicketStatus;
  onChange: (status: TicketStatus) => void;
  displayLabel?: boolean;
  allowSelectAll?: boolean;
}

const SelectTicketStatus: React.FC<SelectTicketStatusProps> = ({
  value,
  displayLabel = true,
  allowSelectAll = false,
  onChange,
}) => {
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>(
    value || ('' as TicketStatus)
  );
  const onChangeStatus = (e: SelectChangeEvent<TicketStatus>) => {
    setTicketStatus(e.target.value as TicketStatus);
    onChange(e.target.value as TicketStatus);
  };
  return (
    
      <FormControl size="small" fullWidth>
        {displayLabel && (
          <InputLabel shrink={false}>{!!ticketStatus || 'Status'}</InputLabel>
        )}
        <Select value={ticketStatus} onChange={onChangeStatus}>
            {allowSelectAll && <MenuItem value={''}>
            <ListItemText sx={{ textTransform: 'uppercase' }}>
              {'All'}
            </ListItemText>
          </MenuItem>}
          <MenuItem value={TicketStatus.TODO}>
            <ListItemText sx={{ textTransform: 'uppercase' }}>
              {TicketStatus.TODO}
            </ListItemText>
          </MenuItem>
          <MenuItem value={TicketStatus.DONE}>
            <ListItemText sx={{ textTransform: 'uppercase' }}>
              {TicketStatus.DONE}
            </ListItemText>
          </MenuItem>
        </Select>
      </FormControl>
   
  );
};

export default SelectTicketStatus;
