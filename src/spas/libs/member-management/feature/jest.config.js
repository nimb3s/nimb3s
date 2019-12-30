module.exports = {
  name: 'member-management-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/member-management/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
