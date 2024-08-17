export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

export enum TicketStatus {
  DONE = 'done',
  TODO = 'todo',
}

export type CreateTicketPayload = {
  description: string;
};

export type UpdateTicketStatusPayload = {
  id: string;
  status: boolean;
};

export type UpdateTicketAssigneePayload = {
  id: string;
  assigneeId: number;
};

export type TicketTableColumn =
  | 'id'
  | 'description'
  | 'assigneeId'
  | 'completed';

export type TicketTableHead = {
  columnKey: TicketTableColumn;
  columnName?: string;
  width?: string;
};

export type Size = 'xs' | 'md' | 'lg'