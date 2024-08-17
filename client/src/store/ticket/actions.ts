import { createAction } from "@reduxjs/toolkit";
import * as constants from './constants';

export const updateTicketList = createAction<string>(constants.GET_TICKETS)
export const createTicket = createAction<string>(constants.CREATE_TICKET)