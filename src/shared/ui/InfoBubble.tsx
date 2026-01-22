import { InfoBubbleProps } from '@/types/common.types';
import { npcs } from 'animal-crossing';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const isabelle = npcs.find((n) => n.name.toLocaleLowerCase() === 'isabelle');
const resetti = npcs.find((n) => n.name.toLocaleLowerCase() === 'resetti');

const InfoBubble = ({
  npc = 'isabelle',
  children = '',
  className = '',
  imageSize = 55,
  title,
}: InfoBubbleProps) => {
  const baseStyle =
    "relative rounded-3xl bg-[#fff4c5] px-6 py-3 text-[17px] after:absolute after:top-1/2 after:-left-6 after:-translate-y-1/2 after:border-12 after:border-r-20 after:border-transparent after:border-r-[#fff4c5] after:content-[''] sm:py-4";
  const finalClasses = twMerge(baseStyle, className);

  const currentNpcData = npc === 'isabelle' ? isabelle : resetti;

  return (
    currentNpcData?.iconImage && (
      <div
        role="status"
        aria-label="안내 메세지"
        className="flex items-center justify-center gap-4"
      >
        <Image
          src={currentNpcData.iconImage}
          alt={currentNpcData.translations.kRko}
          height={imageSize}
          width={imageSize}
        />
        <div className={finalClasses}>
          <h4 className="sr-only">{title}</h4>
          <div>{children}</div>
        </div>
      </div>
    )
  );
};

export default InfoBubble;
