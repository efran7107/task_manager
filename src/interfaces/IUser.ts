export interface IUser {
    getUserNames: () => {name: string, username: string}
    getEmail: () => string
    getId: () => number
}