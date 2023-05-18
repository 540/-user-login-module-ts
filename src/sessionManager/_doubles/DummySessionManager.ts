import { SessionManager } from '../sessionManager'

export class DummySessionManager implements SessionManager {
  login(userName: string, password: string): boolean {
    throw new Error('This method should not be used')
  }

  getSessions(): number {
    throw new Error('This method should not be used')
  }

  logout(): boolean {
    throw new Error('This method should not be used')
  }
}
