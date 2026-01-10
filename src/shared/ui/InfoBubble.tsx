import { InfoBubbleProps } from '@/types/common.types';
import { npcs } from 'animal-crossing';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const isabelle = npcs.find((n) => n.name.toLocaleLowerCase() === 'isabelle');

const InfoBubble = ({ children = '', className = '' }: InfoBubbleProps) => {
  const baseStyle =
    "relative rounded-3xl bg-[#fff4c5] px-6 py-3 text-[17px] after:absolute after:top-1/2 after:-left-6 after:-translate-y-1/2 after:border-12 after:border-r-20 after:border-transparent after:border-r-[#fff4c5] after:content-[''] sm:py-4";
  const finalClasses = twMerge(baseStyle, className);

  return (
    isabelle?.iconImage && (
      <div className="flex items-center justify-center gap-4">
        <Image
          src={isabelle.iconImage}
          alt={isabelle.name}
          height={55}
          width={55}
        />
        <div className={finalClasses}>{children}</div>
      </div>
    )
  );
};

export default InfoBubble;
