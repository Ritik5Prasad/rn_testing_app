import { createNavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';
import { navigate, resetAndNavigate, goBack, push, prepareNavigation, navigationRef } from '../../src/utils/NavigationUtil';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        createNavigationContainerRef: jest.fn(() => ({
            isReady: jest.fn().mockReturnValue(true),
            dispatch: jest.fn(),
        })),
        CommonActions: {
            navigate: jest.fn(),
            reset: jest.fn(),
            goBack: jest.fn(),
        },
        StackActions: {
            push: jest.fn(),
        },
    };
});

describe('Navigation functions', () => {

    it('should navigate to a route', async () => {
        const routeName = 'TestRoute';
        const params = { key: 'value' };
        await navigate(routeName, params);

        expect(CommonActions.navigate).toHaveBeenCalledWith(routeName, params);
    });

    it('should reset and navigate to a route', async () => {
        const routeName = 'TestRoute';
        await resetAndNavigate(routeName);

        expect(CommonActions.reset).toHaveBeenCalledWith({
            index: 0,
            routes: [{ name: routeName }],
        });
    });

    it('should go back', async () => {
        await goBack();

        expect(CommonActions.goBack).toHaveBeenCalled();
    });

    it('should push a route', async () => {
        const routeName = 'TestRoute';
        const params = { key: 'value' };
        await push(routeName, params);

        expect(StackActions.push).toHaveBeenCalledWith(routeName, params);
    });

    it('should prepare navigation', async () => {
        await prepareNavigation();

        expect(navigationRef.isReady).toHaveBeenCalled();
    });
});
