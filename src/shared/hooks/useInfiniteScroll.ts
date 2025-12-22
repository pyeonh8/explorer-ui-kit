'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * 데이터를 일정 개수만큼 끊어서 보여주는 무한 스크롤 커스텀 훅
 *
 * @template T - 객체 형태의 데이터 배열 요소 타입
 * @param initialData - 필터 및 정렬이 완료된 전체 데이터 배열
 * @param itemsPerPage - 한 페이지당 보여줄 아이템 개수 (기본값: 20)
 *
 * @returns slicedData - 현재 페이지까지 계산되어 화면에 보여줄 데이터 배열
 * @returns observerRef - 리스트의 최하단 감지를 위해 부착할 React Ref object
 * @returns hasMore - 보여줄 데이터가 더 남아있는지에 대한 여부
 */
const useInfiniteScroll = <T extends object>(
  initialData: T[],
  itemsPerPage: number = 20
) => {
  const [page, setPage] = useState(1);
  const [prevData, setPrevData] = useState(initialData);

  const observerRef = useRef<HTMLDivElement>(null);

  // page를 ref로 추적
  const pageRef = useRef(page);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  // 페이지 리셋
  if (
    initialData.length !== prevData.length ||
    initialData[0] !== prevData[0]
  ) {
    setPage(1);
    setPrevData(initialData);
  }

  // 현재 보여줄 데이터
  const slicedData = useMemo(() => {
    return initialData.slice(0, page * itemsPerPage);
  }, [initialData, page, itemsPerPage]);

  // 스크롤 감지
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      // 로딩중 요소가 보이는지 && 전체 데이터 > 현재 보여주는 데이터
      if (
        target.isIntersecting &&
        initialData.length > pageRef.current * itemsPerPage
      ) {
        setPage((prev) => prev + 1);
      }
    },
    [initialData.length, itemsPerPage]
  );

  // IntersectionObserver: 요소를 감시하는 객체 / 설정
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current); // 요소 관찰 시작
    }
    return () => observer.disconnect(); // 모든 관찰 중단
  }, [handleObserver]);

  return {
    slicedData,
    observerRef,
    hasMore: initialData.length > slicedData.length,
  };
};

export default useInfiniteScroll;
