import { SessionManager } from '../sessionManager'

export class StubSessionManager implements SessionManager {
  login(userName: string, password: string): boolean {
    throw new Error('This method should not be used')
  }

  getSessions(): number {
    return 44
  }

  logout(): boolean {
    throw new Error('This method should not be used')
  }
}
