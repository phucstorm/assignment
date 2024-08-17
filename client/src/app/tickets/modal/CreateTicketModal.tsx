import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import useTicketApi from 'client/src/api/ticketApi';
import React, { useState } from 'react';

interface AddTicketModalProps {
  open: boolean;
  onClose: () => void;
}
const AddTicketModal: React.FC<AddTicketModalProps> = ({ open, onClose }) => {
  const [description, setDescription] = useState('');
  const { createTicket } = useTicketApi();

  const onCreate = () => {
    createTicket.mutate({ description });
    onReset();
  };

  const onReset = () => {
    setDescription('');
    onClose();
  };

  const renderDialogActions = () => {
    return (
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onCreate}>
          Create
        </Button>
      </DialogActions>
    );
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
      <DialogTitle>Create Ticket</DialogTitle>
      <DialogContent>
        <Box>
          <FormLabel children={<Typography>Description</Typography>} />
          <TextField
            autoFocus
            required
            fullWidth
            multiline
            rows={4}
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>{renderDialogActions()}</DialogActions>
    </Dialog>
  );
};

export default AddTicketModal;
