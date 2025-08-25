import {instance, instanceAuth} from "../../../shared/instance.ts";

export const authApi = {
    login(data: { email: string, password: string }) {
        return instanceAuth.post('/token/', data)
    },
    refresh(data: { refreshToken: string }) {
        return instance.post('/token/refresh', data)
    },
}