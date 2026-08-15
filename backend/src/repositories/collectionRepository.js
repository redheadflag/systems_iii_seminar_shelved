import Repository from './repository.js'

class CollectionRepository extends Repository{
    constructor() {
        super("collection")
    }
}

const collectionRepository = new CollectionRepository()

export default collectionRepository
