// Mocks dos módulos nativos, que não existem no ambiente do Jest
jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
  dismiss: jest.fn(),
  LENGTH_SHORT: -1,
  LENGTH_LONG: 0,
  LENGTH_INDEFINITE: -2,
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('react-native-iap', () => ({
  ErrorCode: { UserCancelled: 'user-cancelled' },
  useIAP: () => ({
    connected: false,
    subscriptions: [],
    fetchProducts: jest.fn(),
    requestPurchase: jest.fn(),
    finishTransaction: jest.fn(),
  }),
}));
