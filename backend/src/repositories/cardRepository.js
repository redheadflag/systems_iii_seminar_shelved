import Repository from './repository.js'

class CardRepository extends Repository{
    constructor() {
        super("card")
    }
}

const cardRepository = new CardRepository()

export default cardRepository
