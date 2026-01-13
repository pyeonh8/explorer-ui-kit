/** 배열에서 단일 아이템 랜덤 추출 */
export const getRandomItem = <T>(items: T[]): T => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

/** 배열에서 여러 개 아이템 중복 없이 랜덤 추출 */
export const getRandomItems = <T>(items: T[], count: number): T[] => {
  if (items.length < count) {
    console.warn('추출하려는 개수가 배열의 크기보다 큽니다.');
    return [...items];
  }

  const results: T[] = [];
  const selectedIndices = new Set<number>();

  // 원하는 count 만큼 채워질 때까지 뽑음
  while (results.length < count) {
    const randomIndex = Math.floor(Math.random() * items.length);

    // 중복 제거
    if (!selectedIndices.has(randomIndex)) {
      selectedIndices.add(randomIndex);
      results.push(items[randomIndex]);
    }
  }
  return results;
};
