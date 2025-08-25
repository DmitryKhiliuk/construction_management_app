export type UserType = {
    "id": number,
    "username": string,
    "first_name": string,
    "last_name": string,
    "patronymic": string,
    "email": string,
    "position": string,
    "department": string
    is_superuser: boolean
}

export type UserListType = {
    "count": number,
    "next": number,
    "previous": number,
    "results": UserType[]
}