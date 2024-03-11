jest.mock('react-native-device-info', () => {
  const deviceInfoMock = jest.requireActual('react-native-device-info/jest/react-native-device-info-mock');
  return {
    ...deviceInfoMock,
    getUniqueId: jest.fn().mockReturnValue('mock-unique-id'),
    getVersion: jest.fn().mockReturnValue('1.0.0'),
  };
});
