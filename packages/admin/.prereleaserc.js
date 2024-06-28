module.exports = {
  branches: [
      {
          name: 'main',
          channel: 'release'
      },
      {
          name: 'develop',
          channel: 'develop',
          prerelease: true
      }
  ],

  plugins: [
      ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],

      [
          '@semantic-release/release-notes-generator',
          {
              preset: 'conventionalcommits',
              presetConfig: {
                  types: [
                      { type: 'feat', section: 'Features' },
                      { type: 'feature', section: 'Features' },
                      { type: 'fix', section: 'Bug Fixes' },
                      { type: 'perf', section: 'Performance Improvements' },
                      { type: 'revert', section: 'Reverts' },
                      { type: 'docs', section: 'Documentation' },
                      { type: 'style', section: 'Styles' },
                      { type: 'chore', section: 'Miscellaneous Chores' },
                      { type: 'refactor', section: 'Code Refactoring' },
                      { type: 'test', section: 'Tests' },
                      { type: 'build', section: 'Build System' },
                      { type: 'ci', section: 'Continuous Integration' }
                  ]
              }
          }
      ],

      ['@semantic-release/npm', { npmPublish: false, pkgRoot: '.' }],

      [
          '@semantic-release/git',
          {
              assets: ['package.json']
          }
      ],

      [
          '@semantic-release/github',
          {
              successComment: false,
              failTitle: false
          }
      ]
  ]
};
