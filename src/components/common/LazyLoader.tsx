import React, { useState, useEffect } from 'react';

interface IProps {
  show: Boolean;
  delay: number;
}

export default function LazyLoader({ show = false, delay = 0 }: IProps) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!show) {
      setShowSpinner(false);
      return;
    }

    if (delay === 0) {
      setShowSpinner(true);
    } else {
      timeout = setTimeout(() => setShowSpinner(true), delay);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [show, delay]);

  return showSpinner ? <div style={{ height: 30 }}>Loading ...</div> : null;
}
