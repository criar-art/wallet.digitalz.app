type AsyncStorageFunction<T> = jest.Mock<Promise<T>, any>;

type AsyncStorageMock = {
  getItem: AsyncStorageFunction<string | null>;
  setItem: AsyncStorageFunction<void>;
  removeItem: AsyncStorageFunction<void>;
  clear: AsyncStorageFunction<void>;
  getAllKeys: AsyncStorageFunction<string[]>;
  multiGet: AsyncStorageFunction<Array<[string, string | null]>>;
  multiSet: AsyncStorageFunction<void>;
  multiRemove: AsyncStorageFunction<void>;
};

const mockAsyncStorage: AsyncStorageMock = {
  getItem: jest.fn((key: string) => {
    return new Promise((resolve) => {
      resolve(`mocked value for ${key}`);
    });
  }),
  setItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  }),
  removeItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  }),
  getAllKeys: jest.fn(() => {
    return new Promise((resolve) => {
      resolve([]);
    });
  }),
  multiGet: jest.fn((keys) => {
    return new Promise((resolve) => {
      resolve(keys.map((key: string) => [key, `mocked value for ${key}`]));
    });
  }),
  multiSet: jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  }),
  multiRemove: jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  }),
};

export default mockAsyncStorage;
