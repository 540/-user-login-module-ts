export interface SessionManager {
    getSessions: () => number
    login: (userName: string, password: string) => boolean
}
