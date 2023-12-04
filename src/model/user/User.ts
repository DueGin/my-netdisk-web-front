export default interface User {
    id?: number,
    // avatar: string,
    username: string,
    password?: string,
    // phone: string,
    type?: number,
    status?: number,
    rememberMe: boolean
}
