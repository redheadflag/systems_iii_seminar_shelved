import Repository from './repository.js'

class MediaRepository extends Repository{
    constructor() {
        super("media")
    }
}

const mediaRepository = new MediaRepository()

export default mediaRepository
