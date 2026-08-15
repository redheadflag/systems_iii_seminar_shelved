import Repository from './repository.js'

class FollowersRepository extends Repository{
    constructor() {
        super("followers")
    }
}

const followersRepository = new FollowersRepository()

export default followersRepository
