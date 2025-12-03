'use client';

import useToggle from '@/shared/hooks/useToggle';

const Test = () => {
  const { value, toggle } = useToggle();

  return (
    <div>
      <h1>테스트 페이지</h1>
      <button onClick={toggle}>{value ? 'false' : 'true'}</button>
    </div>
  );
};

export default Test;
