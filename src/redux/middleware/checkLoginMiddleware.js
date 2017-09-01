import { push } from '../actions';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { routeName } = action;

  if (routeName) {
    if (routeName === 'Admin') {
      const isLogin = getState().userState.get('info').size;
      if (!isLogin) dispatch(push({ name: 'Login', params: { transition: 'forFadeFromBottomAndroid' } }));
    } else {
      next(action);
    }
  } else {
    next(action);
  }

}
