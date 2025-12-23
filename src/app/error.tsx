// error.tsx (같은 폴더에 생성)
'use client';

export default function Error({
  // error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-xl font-bold">앗! 정보를 가져오지 못했어요.</h2>
      <button
        onClick={() => reset()} // 페이지 재시도
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        다시 시도하기
      </button>
    </div>
  );
}
