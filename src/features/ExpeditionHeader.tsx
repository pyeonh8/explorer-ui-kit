const ExpeditionHeader = () => {
  return (
    <div className="w-full">
      <header className="relative flex h-[130px] w-full flex-col items-center justify-center overflow-hidden bg-[url('/images/pattern.jpg')] bg-cover bg-center bg-no-repeat">
        {/* 로고 */}
        <div className="z-10 text-center">
          <h1 className="pb-6 text-center text-2xl font-bold whitespace-pre-line text-white">
            {`탐험해요
           뽀모도로 타이머`}
          </h1>
        </div>

        {/* 헤더 하단 물결 */}
        <div className="absolute bottom-0 left-0 w-[101%]">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block h-[60px] w-full md:h-[50px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C120,110 240,10 360,60 C480,110 600,10 720,60 C840,110 960,10 1080,60 C1200,110 1320,10 1440,60 V120 H0 Z"
              fill="white"
            />
          </svg>
        </div>
      </header>
    </div>
  );
};

export default ExpeditionHeader;
