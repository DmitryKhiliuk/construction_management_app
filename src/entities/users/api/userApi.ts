import {instance} from "../../../shared/instance.ts";

export const usersApi = {
    getUserList() {
        return instance.get('/users')
    },
    getUser(id: number) {
        return instance.get(`/users/${id}`)
    }
}