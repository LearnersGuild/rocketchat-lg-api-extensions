Package.describe({
  name: 'learnersguild:rocketchat-lg-api-extensions',
  version: '0.2.1',
  summary: 'Custom API extensions for Rocket.Chat within Learners Guild.',
  git: 'https://github.com/LearnersGuild/rocketchat-lg-api-extensions'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.1')

  api.use([
    'ecmascript',
    'deepwell:raven@0.3.0',
  ])
  api.use([
    'nimble:restivus@0.8.10',
    'rocketchat:lib@0.0.1',
  ], { weak: true, unordered: false })

  api.addFiles([
    'server/api.js',
    'server/sentry.js',
  ], 'server')
})
