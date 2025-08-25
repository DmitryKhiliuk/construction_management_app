import {create} from "zustand";
import {devtools} from "zustand/middleware";

import Cookies from "universal-cookie";
import {AxiosError} from "axios";
import {immer} from "zustand/middleware/immer";
import {authApi} from "../api/authApi.ts"
import {useUsersStore} from "../../../entities/users/store/usersStore.ts";


export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AccountType {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    error: number | null;
    loading: boolean;


    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => void;
    refresh: () => Promise<boolean>;


}

export interface LoginCredentials {
    email: string;
    password: string;
}


const cookies = new Cookies(null, {path: '/'})

export const useAccountStore = create<AccountType>()(
    devtools(
        immer<AccountType>((set) => ({
            accessToken: cookies.get('tkn') || null,
            refreshToken: cookies.get('ref') || null,
            isAuthenticated: !!cookies.get('tkn'),
            error: null,
            loading: false,


            login: async (credentials: LoginCredentials) => {
                set({loading: true, error: null});
                try {
                    const response = await authApi.login(credentials);
                    const {access, refresh} = response.data;

                    cookies.set('tkn', access);
                    cookies.set('ref', refresh);

                    set({
                        accessToken: access,
                        refreshToken: refresh,
                        isAuthenticated: true,
                        loading: false
                    });

                    return true;
                } catch (err) {
                    const error = err as AxiosError
                    set({error: error.status})
                    return false;
                }
            },


            logout: async () => {
                cookies.remove('tkn');
                cookies.remove('ref');
                useUsersStore.getState().clearUser()
                set({
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false
                });

            },

            refresh: async () => {
                const refreshToken = localStorage.getItem('ref');
                if (!refreshToken) return false;

                try {
                    const response = await authApi.refresh({refreshToken});
                    const {accessToken, refreshToken: newRefreshToken} = response.data;

                    cookies.set('tkn', accessToken);
                    cookies.set('ref', newRefreshToken);

                    set({
                        accessToken,
                        refreshToken: newRefreshToken,
                        isAuthenticated: true
                    });

                    return true;
                } catch (error) {
                    cookies.remove('tkn');
                    cookies.remove('ref');
                    set({
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false
                    });

                    return false;
                }
            },
        })),
        {name: 'auth'}
    )
)