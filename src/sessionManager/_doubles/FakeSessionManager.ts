import { SessionManager } from '../sessionManager'

export class FakeSessionManager implements SessionManager {
  login(userName: string, password: string): boolean {
    if (password !== 'correctPassword') {
      return false
    }

    return true
  }

  getSessions(): number {
    return 44
  }

  logout(): boolean {
    throw new Error('This method should not be used')
  }
}
