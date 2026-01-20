import { createStore, del, get, set } from 'idb-keyval';
import { useTracker } from 'meteor/react-meteor-data';
import React, { ReactNode, useCallback } from 'react';
import { parse, stringify } from 'zipson';
import settings from '../../../settings.json';
import AuthContext, { IAuthCallback, IAuthContext } from './authContext';
import { hasValue } from '/imports/libs/hasValue';
import { userprofileApi } from '/imports/modules/userprofile/api/userProfileApi';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';

const accountStore = createStore(`${settings.name}_UserAccount`, 'store');
const cachedUser = new ReactiveVar(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { user, userLoading, isLoggedIn } = useTracker(() => {
    const isConnected = Meteor.status().connected;

    if (!isConnected) return { userLoading: true };

    let meteorUser = Meteor.user();
    let userId = Meteor.userId();

    const getStoredUser = () =>
      get('userId', accountStore).then((result) => cachedUser.set(result ? parse(result) : null));

    if (hasValue(userId)) {
      set('userId', stringify(meteorUser), accountStore);
    } else if (Meteor.status().status === 'waiting') {
      meteorUser = cachedUser.get() as Meteor.User | null;
      userId = meteorUser?._id || null;
      !userId && getStoredUser();
    } else {
      del('userId', accountStore);
    }

    const subHandle = userprofileApi.subscribe('getLoggedUserProfile');

    const user: IUserProfile | undefined =
      (subHandle?.ready() && meteorUser)
        ? userprofileApi.findOne({ email: (meteorUser?.profile as any).email })
        : null;

    return {
      user,
      userLoading: hasValue(meteorUser) && !hasValue(user),
      isLoggedIn: !!meteorUser,
    };
  }, []);

  const handleLogout = useCallback((callBack: () => void) => {
    Meteor.logout(() => {
      cachedUser.set(null);
      del('userId', accountStore);
      callBack();
    });
  }, [cachedUser, accountStore]);

  const handleSignIn = useCallback((
    email: string,
    password: string,
    callBack: IAuthCallback
  ) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        callBack.onError(error);
      } else {
        callBack.onSuccess();
      }
    });
  }, []);

  const handleSignUp = useCallback((
    username: string,
    email: string,
    password: string,
    callBack: IAuthCallback
  ) => {
    userprofileApi.insertNewUser({ username, email, password }, (err: any) => {
      if (err) {
        callBack.onError(err);
      } else {
        callBack.onSuccess();
      }
    })
  }, []);


  const contextValues: IAuthContext = {
    user: user,
    userLoading: userLoading,
    isLoggedIn: isLoggedIn || false,
    logout: handleLogout,
    signIn: handleSignIn,
    signUp: handleSignUp
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;