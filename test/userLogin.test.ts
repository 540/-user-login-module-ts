import { UserLoginService } from '../src/userLoginService'
import { User } from '../src/user'
import { DummySessionManager } from '../src/sessionManager/_doubles/DummySessionManager'
import { StubSessionManager } from '../src/sessionManager/_doubles/StubSessionManager'
import { FakeSessionManager } from '../src/sessionManager/_doubles/FakeSessionManager'
import { FacebookSessionManager } from '../src/sessionManager/facebookSessionManager'

describe('User Service Login', () => {
  it('should log a user', () => {
    const service = new UserLoginService(new DummySessionManager())
    const user = new User('User1')

    const response = service.manualLogin(user)

    expect(response).toEqual('User successfully logged in')
  })

  it('should check if user is already logged', () => {
    const service = new UserLoginService(new DummySessionManager())
    const user = new User('User1')
    service.manualLogin(user)

    const response = service.manualLogin(user)

    expect(response).toEqual('User already logged in')
  })

  it('should get logged users', () => {
    const service = new UserLoginService(new DummySessionManager())
    const user1 = new User('User1')
    const user2 = new User('User2')
    const expectedUsers = [user1, user2]
    service.manualLogin(user1)
    service.manualLogin(user2)

    const loggedUsers = service.getLoggedUsers()

    expect(loggedUsers).toHaveLength(2)
    expect(loggedUsers).toEqual(expectedUsers)
  })

  it('should get sessions from external service', () => {
    const service = new UserLoginService(new StubSessionManager())

    const externalSessions = service.getExternalSessions()

    expect(externalSessions).toEqual(44)
  })

  it('should log a user if username and password are correct', () => {
    const service = new UserLoginService(new FakeSessionManager())

    const loginResponse = service.login('user1Name', 'correctPassword')

    expect(loginResponse).toEqual('Login correct')
  })

  it('should not log a user if username or password are incorrect', () => {
    const service = new UserLoginService(new FakeSessionManager())

    const loginResponse = service.login('user1Name', 'incorrectPassword')

    expect(loginResponse).toEqual('Login incorrect')
  })

  it('should logout a user if user is already logged in', () => {
    const sessionManager = new FacebookSessionManager()
    jest.spyOn(sessionManager, 'logout')
    const service = new UserLoginService(sessionManager)
    const user = new User('user1')
    service.manualLogin(user)

    service.logout(user)

    expect(sessionManager.logout).toHaveBeenCalled()
  })

  it('should not logout a user if user is not found', () => {
    const sessionManager = new FacebookSessionManager()
    jest.spyOn(sessionManager, 'logout')
    const service = new UserLoginService(sessionManager)
    const user = new User('user1')

    service.logout(user)

    expect(sessionManager.logout).not.toHaveBeenCalled()
  })

  it('should not logout user if user is not logged in in Facebook', () => {
    const sessionManager = new FacebookSessionManager()
    jest.spyOn(sessionManager, 'logout').mockImplementation(() => {
      throw new Error('user_not_logged_in')
    })
    const service = new UserLoginService(sessionManager)
    const user = new User('user1')
    service.manualLogin(user)

    const response = service.logout(user)

    expect(response).toEqual('User not logged in Facebook')
  })

  it('should logout user if user is logged in in Facebook', () => {
    const sessionManager = new FacebookSessionManager()
    jest.spyOn(sessionManager, 'logout').mockImplementation(() => {
      throw new Error('service_not_available')
    })
    const service = new UserLoginService(sessionManager)
    const user = new User('user1')
    service.manualLogin(user)

    const response = service.logout(user)

    expect(response).toEqual('Service not available')
  })
})
