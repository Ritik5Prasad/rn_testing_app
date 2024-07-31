import { registerUser, loginUser, setUser, selectUser } from '../../../src/redux/reducers/userSlice';
import { RootState, store } from '../../../src/redux/store';

jest.mock('redux-persist', () => {
    const actualReduxPersist = jest.requireActual('redux-persist');
    return {
        ...actualReduxPersist,
        persistStore: jest.fn().mockReturnValue({

        }),
    };
});

describe('userSlice', () => {
    test('should handle initial state', () => {
        const state = store.getState() as RootState;
        expect(selectUser(state)).toBeNull();
    });

    test('should handle setUser', () => {
        const user = { name: 'John Doe', email: 'john@example.com' };
        store.dispatch(setUser(user));
        const state = store.getState() as RootState;
        expect(selectUser(state)).toEqual(user);
    });

    describe('registerUser thunk', () => {
        test('should handle successful registration', async () => {
            const user = { name: 'Jane Doe', email: 'jane@example.com' };
            const action = await store.dispatch(registerUser(user));
            const state = store.getState() as RootState;

            expect(action.type).toBe(registerUser.fulfilled.type);
            expect(selectUser(state)).toEqual(user);
        });

        test('should handle failed registration', async () => {
            const action = await store.dispatch(registerUser({})); // Invalid user to trigger failure
            const state = store.getState() as RootState;

            expect(action.type).toBe(registerUser.rejected.type);
            expect(selectUser(state)).toBeNull();
        });
    });

    describe('loginUser thunk', () => {
        test('should handle successful login', async () => {
            const credentials = { email: 'jane@example.com', password: 'password123' };
            const action = await store.dispatch(loginUser(credentials));
            const state = store.getState() as RootState;

            expect(action.type).toBe(loginUser.fulfilled.type);
            expect(selectUser(state)).toEqual(credentials);
        });



        test('should handle failed login', async () => {
            const action = await store.dispatch(loginUser({})); // Invalid credentials to trigger failure
            const state = store.getState() as RootState;

            expect(action.type).toBe(loginUser.rejected.type);
            expect(selectUser(state)).toBeNull();
        });

    });
});
