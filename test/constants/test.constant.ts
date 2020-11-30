import { UUIDType } from './../../src/utils/uuid.service';

// User
export const TEST_USER_NAME = 'testing';
export const TEST_WRONG_USER_NAME = 'USwrong';
export const TEST_USER_ID = 'UStesting';
export const TEST_USER_ACCESS_TOKEN = 'testing';

// Kanban
export const TEST_KANBAN_ID = 'KAtesting';
export const TEST_WRONG_KANBAN_ID = 'KAwrong';
export const TEST_KANBAN_STATUS: { id: string; name: string }[] = [
  { id: UUIDType.KANBANSTATUS + 'testing1', name: 'Backlog' },
  { id: UUIDType.KANBANSTATUS + 'testing2', name: 'To Do' },
  { id: UUIDType.KANBANSTATUS + 'testing3', name: 'Ongoing' },
  { id: UUIDType.KANBANSTATUS + 'testing4', name: 'Done' },
];
