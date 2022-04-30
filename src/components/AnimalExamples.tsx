import { fetchDog } from '../api/animalApi';
import React, { useEffect, useState } from 'react';
import { withAsync } from '../helpers/withAsync';
import { IDLE, PENDING, SUCCESS, ERROR } from '../constants/apiStatus';
import useApiStatus from '../hooks/useApiStatus';

const useFetchDog = () => {
  const [dog, setDog] = useState<string>();

  const { setStatus, isPending, isIdle, isError, isSuccess } = useApiStatus(IDLE);

  const initFetchDog = async () => {
    setStatus(PENDING);

    const { response, error } = await withAsync(() => fetchDog());

    if (error) {
      setStatus(ERROR);
    } else if (response) {
      setDog(response.data.message);
      setStatus(SUCCESS);
    }
  };

  return { dog, initFetchDog, isPending, isIdle, isError, isSuccess };
};

function AnimalExample() {
  const { dog, initFetchDog, isPending, isIdle, isError, isSuccess } = useFetchDog();

  useEffect(() => {
    initFetchDog();
  }, []);

  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex gap-8">
        {isIdle ? <p>Welcome</p> : null} {isPending ? <p>Loading data...</p> : null}{' '}
        {isError ? <p>There was a problem</p> : null}{' '}
        {isSuccess ? <img className="h-64 w-full object-cover" src={dog} alt="Dog" /> : null}
      </div>
      <button onClick={initFetchDog} className="mt-4 bg-blue-800 text-blue-100 p-4">
        Fetch animals
      </button>
    </div>
  );
}
export default AnimalExample;
