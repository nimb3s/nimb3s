module.exports = {
  name: 'nimb3s',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nimb3s',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
