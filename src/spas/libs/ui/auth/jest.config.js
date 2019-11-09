module.exports = {
  name: 'ui-auth',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
