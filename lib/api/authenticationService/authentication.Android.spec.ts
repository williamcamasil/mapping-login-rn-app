import { CLI_ID_GOOGLE } from '.';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

describe('authentication android', () => {
  it('CLI_ID_GOOGLE', async () => {
    expect(CLI_ID_GOOGLE).toBe('756364528893-8ocn5ffqjm90iu3i9dr8g479mciqasoe.apps.googleusercontent.com');
  });
});
