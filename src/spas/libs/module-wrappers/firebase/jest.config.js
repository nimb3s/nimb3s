module.exports = {
  name: 'module-wrappers-firebase',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/module-wrappers/firebase',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
