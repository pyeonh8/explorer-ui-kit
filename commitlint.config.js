const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서만 수정
        'style', // 포맷팅 (세미콜론, 공백 등)
        'refactor', // 리팩터링
        'perf', // 성능 개선
        'test', // 테스트 추가/수정
        'chore', // 빌드, 설정 파일 등 기타
        'revert', // git revert
      ],
    ],
    'header-max-length': [2, 'always', 50],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};

export default config;
