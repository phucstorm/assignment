import { render, renderHook, waitFor } from '@testing-library/react';

import Tickets from './tickets';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import useTicketApi from 'client/src/api/ticketApi';

const queryClient = new QueryClient();
const mockData = [
  {
    id: 1,
    description: 'Install a monitor arm',
    assigneeId: 1,
    completed: true,
  },
  {
    id: 2,
    description: 'Move the desk to the new location',
    assigneeId: 1,
    completed: false,
  },
];
function getTestComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tickets />
    </QueryClientProvider>
  );
}

describe('Tickets', () => {
  test('should render successfully', () => {
    const { baseElement } = render(getTestComponent());
    expect(baseElement).toBeTruthy();
  });

  test('should display page title', () => {
    const { queryByText } = render(getTestComponent());
    expect(queryByText('Ticketing App')).toBeTruthy();
  });

  test('should display create ticket button', () => {
    const { queryByText } = render(getTestComponent());
    expect(queryByText('Create')).toBeTruthy();
  });

  test('should display ticket table with columns', () => {
    const { queryByText } = render(getTestComponent());
    expect(queryByText('Ticket ID')).toBeTruthy();
    expect(queryByText('Description')).toBeTruthy();
    expect(queryByText('Status')).toBeTruthy();
    expect(queryByText('Assignee')).toBeTruthy();
  });

  test('should call API get list ticket', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockData),
      ok: true,
      status: 200,
      headers: new Headers(),
    } as Response);

    const { result } = renderHook(() => useTicketApi().getList);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/tickets');
  });
});
