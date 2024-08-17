import {
  CreateTicketPayload,
  Ticket,
  UpdateTicketAssigneePayload,
  UpdateTicketStatusPayload,
} from '@acme/shared-models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useTicketApi = () => {
  const queryClient = useQueryClient();

  const getList = useQuery({
    queryKey: ['getListTicekt'],
    queryFn: async (): Promise<Ticket[]> => {
      const response = await fetch('/api/tickets');
      return response.json();
    },
  });

  const createTicket = useMutation({
    mutationKey: ['createTicket'],
    mutationFn: async (payload: CreateTicketPayload) => {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getListTicekt'],
      });
    },
  });

  const getDetail = (id: string) =>
    useQuery({
      queryKey: ['getTicketDetail'],
      queryFn: async (): Promise<Ticket> => {
        const response = await fetch(`/api/tickets/${id}`);
        return response.json();
      },
    });

  const updateStatus = useMutation({
    mutationKey: ['updateTicketStatus'],
    mutationFn: async (payload: UpdateTicketStatusPayload) => {
      const { id, status } = payload;
      const response = await fetch(`/api/tickets/${id}/complete`, {
        method: status ? 'PUT' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTicketDetail'],
      });
    },
  });

  const assign = useMutation({
    mutationKey: ['updateTicketStatus'],
    mutationFn: async (payload: UpdateTicketAssigneePayload) => {
      const { id, assigneeId } = payload;
      const unassignUrl = `/api/tickets/${id}/unassign`;
      const assignUrl = `/api/tickets/${id}/assign/${assigneeId}`;
      const url = assigneeId === 0 ? unassignUrl : assignUrl;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTicketDetail'],
      });
    },
  });

  return {
    getList,
    createTicket,
    getDetail,
    updateStatus,
    assign
  };
};

export default useTicketApi;
