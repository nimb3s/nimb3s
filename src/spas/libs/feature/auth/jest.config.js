module.exports = {
  name: 'feature-auth',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/feature/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
