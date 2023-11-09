import {SessionManager} from "../sessionManager";

export class FakeSessionManager implements SessionManager {
    login(username: string, password: string): boolean {
        if ((!(username === "Denis")) || (!(password === "contraseñaCorrecta"))) {
            return false
        }

        return true
    }

    getSessions(): number {
        throw new Error("I'm a fake, this method should nit be used")
    }

    logout(username: string): boolean {
        throw new Error("I'm a fake, this method should not be used")
    }
}