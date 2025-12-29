import getGameEntityInfoProps from '@/shared/utils/getGameEntityInfo';

/**
 * @param data - 가공할 데이터 배열
 * @param targetKey - 검색어로 사용할 객체의 키 ('character' / 'name')
 */
const dataTransformer = <T extends { character?: string; name?: string }>(
  data: T[],
  targetKey: keyof T
) => {
  return data.map((d) => {
    const searchName = (d[targetKey] as string) || '';
    return {
      ...d,
      ...getGameEntityInfoProps(searchName),
    };
  });
};

export default dataTransformer;
