// ApiStatus type
export type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

// Constants
export const IDLE: ApiStatus = 'IDLE';
export const PENDING: ApiStatus = 'PENDING';
export const SUCCESS: ApiStatus = 'SUCCESS';
export const ERROR: ApiStatus = 'ERROR';

export const defaultApiStatus: ApiStatus[] = ['IDLE', 'PENDING', 'SUCCESS', 'ERROR'];

// ApiStatuses record, {Key: Type}
export type ApiStatuses = Record<ApiStatus, ApiStatus>;
// Can be used as constants
export const apiStatus: ApiStatuses = { IDLE, PENDING, SUCCESS, ERROR };
