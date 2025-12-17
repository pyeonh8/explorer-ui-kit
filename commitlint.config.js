module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 1. 대소문자 검사 비활성화 (한글 사용을 위해 필수)
    // 영문 기준의 Case 검사를 끄더라도, 다른 규칙들이 메시지의 질을 유지해줍니다.
    'subject-case': [0],

    // 2. 제목 끝에 마침표(.) 금지
    // 커밋 메시지 제목은 문장이 아니므로 마침표를 찍지 않는 것이 관례입니다.
    'subject-full-stop': [2, 'never', '.'],

    // 3. 제목(subject)은 비어있을 수 없음
    'subject-empty': [2, 'never'],

    // 4. 유형(type)은 반드시 지정된 것만 사용 가능
    // feat, fix, refactor 등을 강제하여 규칙성을 유지합니다.
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'refactor', // 코드 리팩토링
        'style', // 스타일 관련 (코드 의미 변화 X)
        'docs', // 문서 수정
        'test', // 테스트 코드
        'chore', // 빌드 업무, 패키지 매니저 설정 등
        'perf', // 성능 개선
      ],
    ],

    // 5. 유형(type)은 항상 소문자로 작성
    'type-case': [2, 'always', 'lower-case'],

    // 6. 유형(type)은 비어있을 수 없음
    'type-empty': [2, 'never'],
  },
};
