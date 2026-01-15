import CharacterCardList from '../characters/CharacterCardList';
import CharacterSlot from '../characters/CharacterSlot';
import Modal from '@/shared/ui/modal/Modal';
import IconButton from '@/shared/ui/IconButton';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { ExpeditionSetupProps } from '@/types/features.type';
import { IoIosWarning } from 'react-icons/io';
import { RxLapTimer } from 'react-icons/rx';
import { RiLeafFill } from 'react-icons/ri';

// 탐험 준비 화면
const ExpeditionSetup = ({
  goalRounds,
  onAdventureStart,
  translatedAmiibo,
  selectedCharacters,
  onCharacterSelect,
}: ExpeditionSetupProps) => {
  const notChoice = selectedCharacters.length === 0;

  return (
    <>
      {/* 선택한 캐릭터 */}
      <CharacterSlot
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelect}
      />

      {/* 뽀모도로 타이머 시작 버튼 */}
      <section aria-labelledby="timer-start-title">
        <h3 id="timer-start-title" className="sr-only">
          뽀모도로 타이머 시작하기
        </h3>

        <Modal
          title={`${!notChoice ? '뽀모도로 타이머 시작 안내' : '경고 안내'}`}
          role={`${!notChoice ? 'dialog' : 'alertdialog'}`}
          openButton={(open) => (
            <IconButton
              aria-label="뽀모도로 타이머 시작하기 안내창 열기"
              className="m-auto min-h-[55px] w-[200px] max-w-full text-[20px] font-bold sm:min-h-[60px] sm:text-[23px]"
              onClick={open}
            >
              <RiLeafFill aria-hidden="true" /> 모험 Start !
            </IconButton>
          )}
          actionButton={
            !notChoice && (
              <ModalButton onClick={() => onAdventureStart(true)}>
                타이머 시작
              </ModalButton>
            )
          }
        >
          <div className="flex flex-col items-center gap-3 whitespace-pre-line">
            {!notChoice ? (
              <>
                <RxLapTimer
                  aria-hidden="true"
                  className="text-3xl text-(--color-accent)"
                />
                <ul>
                  <p>
                    <b>{`${goalRounds}회 동안 모험이 시작됩니다!`}</b> <br />
                    <span className="text-[16px]">{`${25 * goalRounds}분 집중과 ${5 * goalRounds}분 휴식이 준비되어 있습니다.`}</span>
                  </p>
                </ul>
              </>
            ) : (
              <>
                <IoIosWarning
                  aria-hidden="true"
                  className="text-3xl text-orange-700"
                />
                <p>
                  최소{' '}
                  <strong className="font-black text-orange-700">1명</strong>의
                  캐릭터를 선택해주세요.
                </p>
              </>
            )}
          </div>
        </Modal>
      </section>

      <CharacterCardList
        translatedAmiibo={translatedAmiibo}
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelect}
      />
    </>
  );
};

export default ExpeditionSetup;
