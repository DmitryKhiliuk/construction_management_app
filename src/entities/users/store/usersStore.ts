import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {usersApi} from "../api/userApi.ts";
import {AxiosError} from "axios";
import type {UserListType, UserType} from "../types/userTypes.ts";

export type UsersStoreType = {
    error: number | null;
    loading: boolean;

    users: UserListType | null
    user: UserType | null

    getUsersTC: () => void
    getUserTC: (id: number) => void
    clearUser: () => void
}

export const useUsersStore = create<UsersStoreType>()(
    devtools(
        immer<UsersStoreType>((set) => ({
            error: null,
            loading: false,

            users: null,
            user: null,

            getUsersTC: async () => {
                set({loading: true})
                try {
                    const res = await usersApi.getUserList()
                    set({users: {...res.data, results: res.data.results.filter((el: UserType) => el.username !== 'root')}})
                } catch (err) {
                    const error = err as AxiosError
                    set({error: error.status})
                } finally {
                    set({loading: false})
                }
            },
             getUserTC: async (id) => {
                set({loading: true})
                try {
                    const res = await usersApi.getUser(id)
                    set({user: res.data})
                } catch (err) {
                    const error = err as AxiosError
                    set({error: error.status})
                } finally {
                    set({loading: false})
                }
            },
            clearUser: () =>
                set((state) => {
                    state.user = null
                }),
        }))
    )
)