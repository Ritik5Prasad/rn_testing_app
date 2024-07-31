import { MMKV } from 'react-native-mmkv';
import reduxStorage from '../../src/redux/storage';


// Mock the MMKV storage instance
jest.mock('react-native-mmkv', () => {
    const setMock = jest.fn();
    const getStringMock = jest.fn();
    const deleteMock = jest.fn();

    return {
        MMKV: jest.fn().mockImplementation(() => ({
            set: setMock,
            getString: getStringMock,
            delete: deleteMock,
        })),
        setMock,
        getStringMock,
        deleteMock,
    };
});

describe('reduxStorage', () => {
    let setMock: jest.Mock;
    let getStringMock: jest.Mock;
    let deleteMock: jest.Mock;

    beforeEach(() => {
        ({ setMock, getStringMock, deleteMock } = require('react-native-mmkv'));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('setItem should call MMKV.set with the correct parameters', async () => {
        const key = 'testKey';
        const value = 'testValue';

        await reduxStorage.setItem(key, value);

        expect(setMock).toHaveBeenCalledWith(key, value);
    });

    test('getItem should return the correct value from MMKV.getString', async () => {
        const key = 'testKey';
        const value = 'testValue';

        getStringMock.mockReturnValue(value);

        const result = await reduxStorage.getItem(key);

        expect(result).toBe(value);
        expect(getStringMock).toHaveBeenCalledWith(key);
    });

    test('removeItem should call MMKV.delete with the correct key', async () => {
        const key = 'testKey';

        await reduxStorage.removeItem(key);

        expect(deleteMock).toHaveBeenCalledWith(key);
    });
});
