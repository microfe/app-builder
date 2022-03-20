module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['init', 'chore', 'fix', 'feat', 'doc', 'style', 'refactor', 'perf']],
    'scope-case': [0, 'never'],
    'subject-case': [0, 'never']
  },
  ignores: [(message) => message.startsWith('Merge branches')],
};
