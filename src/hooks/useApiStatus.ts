import { useState, useMemo } from 'react';
import { IDLE, ApiStatus, defaultApiStatus } from './../constants/apiStatus';

// Create a new record with (key => type)
// Where the key => is[ApiStatus], and the type is boolean
type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function prepareStatuses(currentStatus: ApiStatus): Statuses {
  const statuses = {} as Statuses;

  for (const status of defaultApiStatus) {
    const normalisedStatus = capitalize(status.toLowerCase());
    const normalisedStatusKey = `is${normalisedStatus}` as keyof Statuses;
    statuses[normalisedStatusKey] = status === currentStatus;
  }

  /*  statuses = {
        isIdle: false,
        isPending: false,
        ...
     }*/
  return statuses;
}

export default function useApiStatus(currentStatus = IDLE) {
  const [status, setStatus] = useState<ApiStatus>(currentStatus);
  const statuses = useMemo(() => {
    return prepareStatuses(status);
  }, [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
}
