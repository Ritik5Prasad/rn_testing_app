import { persistStore } from "redux-persist"
import { RootState, store } from "../../../src/redux/store"
import { loginUser, registerUser, selectUser, setUser } from "../../../src/redux/reducers/userSlice"

jest.mock('redux-persist', () => {
    const actualReduxPersist = jest.requireActual('redux-persist')
    return {
        ...actualReduxPersist,
        persistStore: jest.fn().mockReturnValue({})
    }
})

describe('userSlice', () => {
    test('should handle initial State', () => {
        const state = store.getState() as RootState
        expect(selectUser(state)).toBeNull()
    })

    test('should handle set User', () => {
        const user = { name: 'Ritik', email: 'Ritik@gmail.com' }
        store.dispatch(setUser(user))
        const state = store.getState() as RootState
        expect(selectUser(state)).toEqual(user)
    })
})

describe('register user thunk', () => {
    test('should handle successful registration', async () => {
        const user = { name: 'Ritik', email: 'Ritik@gmail.com' }
        const action = await store.dispatch(registerUser(user))
        const state = store.getState() as RootState

        expect(action.type).toBe(registerUser.fulfilled.type)

        expect(selectUser(state)).toEqual(user)
    })

    test('should handle successful failure', async () => {

        const action = await store.dispatch(registerUser({}))
        const state = store.getState() as RootState

        expect(action.type).toBe(registerUser.rejected.type)

        expect(selectUser(state)).toBeNull()
    })
})


describe('login user thunk', () => {
    test('should handle successful login', async () => {
        const credentials = { email: 'Ritik@gmail.com', password: '12345677', }
        const action = await store.dispatch(loginUser(credentials))
        const state = store.getState() as RootState

        expect(action.type).toBe(loginUser.fulfilled.type)

        expect(selectUser(state)).toEqual(credentials)
    })

    test('should handle successful failure', async () => {

        const action = await store.dispatch(loginUser({}))
        const state = store.getState() as RootState

        expect(action.type).toBe(loginUser.rejected.type)

        expect(selectUser(state)).toBeNull()
    })
})