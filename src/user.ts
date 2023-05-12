export class User {
    private userName: string

    constructor(userName: string) {
        this.userName = userName
    }

    getUserName = () => this.userName

}
