import { createContext } from 'react';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';

export interface IAuthCallback {
    onSuccess: () => void;
    onError: (err: Error | Meteor.Error | Meteor.TypedError) => void;
};


interface IAuthContext {
    isLoggedIn: boolean;
    user?: IUserProfile;
    userLoading: boolean;
    logout: (callback: () => void) => void;
    signIn: (email: string, password: string, callback: IAuthCallback) => void;
    signUp: (username: string, email: string, password: string, callback: IAuthCallback) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
export type { IAuthContext };
