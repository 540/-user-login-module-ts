import { SessionManager } from './sessionManager'

export class FacebookSessionManager implements SessionManager {
  login(userName: string, password: string): boolean {
    //Imaginad que esto en realidad realiza una llamada al API de Facebook
    return Math.random() < 0.5
  }

  logout(userName: string): void {}

  getSessions(): number {
    //Imaginad que esto en realidad realiza una llamada al API de Facebook
    return Math.floor(Math.random() * 50)
  }
}
