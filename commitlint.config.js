// commitlint.config.js (Subject Case 유연하게 설정)
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [
      2,
      'always',
      [
        'sentence-case', // 문장처럼 첫 글자만 대문자 허용
        'start-case', // 각 단어 대문자 허용
        'pascal-case', // PascalCase 허용
        'camel-case', // camelCase 허용
      ],
    ],
  },
};
