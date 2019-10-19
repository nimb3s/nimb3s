module.exports = {
  name: 'jwadmin',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/jwadmin',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
