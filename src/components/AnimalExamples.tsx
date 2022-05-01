import { fetchDog } from '../api/animalApi';
import React, { useEffect } from 'react';
// import { withAsync } from '../helpers/withAsync';
// import { PENDING, SUCCESS, ERROR } from '../constants/apiStatus';

import LazyLoader from './common/LazyLoader';
import useApi from '../hooks/useApi';

const useFetchDog = () => {
  const {
    data: dog,
    exec: initFetchDog,
    isPending,
    isIdle,
    isError,
    isSuccess,
  } = useApi(() => fetchDog().then((res) => res.data.message), {});

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
        {isIdle ? <p>Welcome</p> : null}
        <LazyLoader show={isPending} delay={400} />
        {isError ? <p>There was a problem</p> : null}
        {isSuccess ? <img className="h-64 w-full object-cover" src={dog} alt="Dog" /> : null}
      </div>
      <button onClick={initFetchDog} className="mt-4 bg-blue-800 text-blue-100 p-4">
        Fetch animals
      </button>
    </div>
  );
}
export default AnimalExample;
