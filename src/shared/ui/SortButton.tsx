import Button from '@/shared/ui/Button';
import { TbSortAscending } from 'react-icons/tb';
import { TbSortDescending } from 'react-icons/tb';
import { SortConfigProps } from '@/types/hooks.types';

const SortButton = <T,>({
  sortConfig,
  requestSort,
  sortKey,
}: {
  sortConfig: SortConfigProps<T>;
  requestSort: (key: keyof T) => void;
  sortKey: keyof T;
}) => {
  return (
    <Button
      variant="plain"
      aria-label={`이름순 ${sortConfig.direction === 'asc' ? '내림차순' : '오름차순'} 정렬`}
      onClick={() => requestSort(sortKey)}
      className="flex items-center gap-1 pl-1 text-[15px] font-bold"
    >
      <span aria-hidden="true" className="text-[20px]">
        {sortConfig.direction === 'asc' ? (
          <TbSortAscending />
        ) : (
          <TbSortDescending />
        )}
      </span>
      이름순
    </Button>
  );
};

export default SortButton;
