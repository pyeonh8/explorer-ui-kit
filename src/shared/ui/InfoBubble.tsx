import { InfoBubbleProps } from '@/types/common.types';
import { twMerge } from 'tailwind-merge';

const InfoBubble = ({ children = '', className = '' }: InfoBubbleProps) => {
  const baseStyle =
    "relative rounded-3xl bg-[#fff4c5] px-6 py-3 text-[17px] after:absolute after:top-1/2 after:-left-6 after:-translate-y-1/2 after:border-12 after:border-r-20 after:border-transparent after:border-r-[#fff4c5] after:content-[''] sm:py-5";
  const finalClasses = twMerge(baseStyle, className);
  return <div className={finalClasses}>{children}</div>;
};

export default InfoBubble;
