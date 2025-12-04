'use client';

import useToggle from '@/shared/hooks/useToggle';
import useCounter from '@/shared/hooks/useCounter';

const Test = () => {
  const { value, toggle } = useToggle();
  const { count, increment, decrement, reset } = useCounter({
    // max: 10,
    // min: 1,
  });

  return (
    <div>
      <h1>테스트 페이지</h1>
      <button onClick={toggle}>{value ? 'false' : 'true'}</button>
      <div>
        <button onClick={increment}>올라감</button>
        <button onClick={decrement}>내려감</button>
        <button onClick={reset}>리셋</button>
        {count}
      </div>
    </div>
  );
};

export default Test;
