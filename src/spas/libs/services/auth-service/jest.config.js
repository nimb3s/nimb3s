module.exports = {
  name: 'services-auth-service',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/services/auth-service',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
