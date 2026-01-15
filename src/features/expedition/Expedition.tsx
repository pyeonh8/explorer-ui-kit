'use client';

import { useCallback, useState } from 'react';
import { creatures } from 'animal-crossing';
import { TranslatedAmiibo, TranslateVillager } from '@/types/api.types';
import CharacterPanel from './components/CharacterPanel';
import ExpeditionHeader from './ExpeditionHeader';
import ExpeditionNav from './ExpeditionNav';
import ExpeditionSetup from '@/features/expedition/ExpeditionSetup';
import ExpeditionPlay from './ExpeditionPlay';
import Modal from '@/shared/ui/modal/Modal';
import ModalButton from '@/shared/ui/modal/ModalButton';
import IconButton from '@/shared/ui/IconButton';
import { IoIosWarning } from 'react-icons/io';
import { FaHourglassStart } from 'react-icons/fa';

// 탐험 페이지
const Expedition = ({
  translatedAmiibo,
  translatedVillagers,
}: {
  translatedAmiibo: TranslatedAmiibo[];
  translatedVillagers: TranslateVillager[];
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdventureStarted, setIsAdventureStarted] = useState(false);
  const [goalRounds, setGoalRounds] = useState(1);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [isBgmEnabled, setIsBgmEnabled] = useState(false);

  // 타이머 횟차
  const SESSION_OPTIONS = [1, 2, 3, 4];

  // 모험 캐릭터 선택
  const toggleCharacterSelection = useCallback((character: string) => {
    setSelectedCharacters((prev) => {
      // 이미 선택된 경우: 선택 해제
      if (prev.includes(character))
        return prev.filter((item) => item !== character);

      // 2. 최대 개수 도달 시: 경고
      if (prev.length >= 5) {
        setModalOpen(true);
        return prev;
      }
      return [...prev, character];
    });
  }, []);

  return (
    <div className="grid grid-cols-[1fr_minmax(0,580px)_1fr] gap-2.5 sm:gap-4">
      <aside aria-label="컨트롤 패널" className="pl-2">
        {/* 좌측 메뉴 */}
        <ExpeditionNav
          isBgmEnabled={isBgmEnabled}
          setIsBgmEnabled={setIsBgmEnabled}
          isAdventureStarted={isAdventureStarted}
          isTimerFinished={isTimerFinished}
        />
        {/* 타이머 횟수 버튼 */}
        {!isAdventureStarted && (
          <section aria-label="뽀모도로 타이머 설정">
            <h2 className="sr-only">반복 횟수 선택</h2>
            <ul className="flex flex-col gap-2 pt-4">
              {SESSION_OPTIONS.map((num) => {
                const selectStyle =
                  'border-b-[4px] border-t-[4px] bg-(--color-accent) text-white';
                return (
                  <li key={num}>
                    <IconButton
                      aria-label={`${num}회 반복`}
                      // aria-pressed: 버튼이 선택되어 있는지
                      aria-pressed={num === goalRounds}
                      className={`${num === goalRounds && selectStyle} snm w-full justify-between gap-0.5 sm:justify-center sm:gap-1.5`}
                      onClick={() => setGoalRounds(num)}
                    >
                      <FaHourglassStart
                        aria-hidden="true"
                        className="text-[17px] sm:text-[20px]"
                      />
                      <span className="text-[12px] font-bold whitespace-nowrap">
                        x {num}
                      </span>
                    </IconButton>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </aside>

      <main className="max-w-[600px] overflow-hidden rounded-2xl border-(--color-primary) bg-white">
        {/* 헤더 */}
        <ExpeditionHeader />

        {/* 컨텐츠 영역 */}
        <section
          aria-labelledby="adventure-status-title"
          aria-live="polite"
          className="px-2 pt-2 pb-3 sm:px-3"
        >
          <h2 id="expedition-status-title" className="sr-only">
            {!isAdventureStarted
              ? '뽀모도로 타이머 준비 화면'
              : '뽀모도로 타이머 화면'}
          </h2>

          {/* 캐릭터 화면 */}
          <CharacterPanel
            selectedCharacters={selectedCharacters}
            villagers={translatedVillagers}
            isTimerRunning={isTimerRunning}
          />

          {!isAdventureStarted ? (
            // 탐험 준비
            <ExpeditionSetup
              goalRounds={goalRounds}
              onAdventureStart={setIsAdventureStarted}
              translatedAmiibo={translatedAmiibo}
              selectedCharacters={selectedCharacters}
              onCharacterSelect={toggleCharacterSelection}
            />
          ) : (
            // 탐험 시작
            <ExpeditionPlay
              goalRounds={goalRounds}
              collectibleItems={creatures}
              isAdventureStarted={isAdventureStarted}
              onAdventureStart={setIsAdventureStarted}
              selectedCharacters={selectedCharacters}
              isTimerRunning={isTimerRunning}
              onTimerRunningChange={setIsTimerRunning}
              isTimerFinished={isTimerFinished}
              setIsTimerFinished={setIsTimerFinished}
            />
          )}
        </section>

        <div className="h-4 w-full bg-[url('/images/pattern.jpg')] bg-cover bg-center bg-no-repeat"></div>
      </main>
      <div className="invisible"></div>

      {/* 캐릭터 선택 경고 모달 */}
      <Modal
        title="경고 안내"
        role="alertdialog"
        isOpen={modalOpen}
        actionButton={
          <ModalButton
            onClick={() => {
              setModalOpen(false);
              console.log(modalOpen);
            }}
          >
            닫기
          </ModalButton>
        }
        hideCloseButton
      >
        <div className="flex flex-col items-center gap-3">
          <IoIosWarning
            aria-hidden="true"
            className="text-3xl text-orange-700"
          />
          <p>
            최대 캐릭터 <strong className="text-orange-700">5명</strong> 까지
            선택 가능합니다.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Expedition;
