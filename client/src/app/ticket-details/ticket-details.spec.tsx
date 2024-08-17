import { render, renderHook, waitFor } from '@testing-library/react';
import TicketDetails from './ticket-details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useTicketApi from 'client/src/api/ticketApi';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockData = {
  id: 1,
  description: 'Install a monitor arm',
  assigneeId: 1,
  completed: false,
};
const queryClient = new QueryClient();
function getTestComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <TicketDetails />
    </QueryClientProvider>
  );
}

describe('TicketDetails', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<TicketDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  test('should display ticket description', () => {
    const { queryByText } = render(getTestComponent());
    expect(queryByText('Install a monitor arm')).toBeTruthy();
  });

  test('should call API ticket detail', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockData),
      ok: true,
      status: 200,
      headers: new Headers(),
    } as Response);

    const { result } = renderHook(() => useTicketApi().getDetail('1'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/tickets/1');
  });
});
