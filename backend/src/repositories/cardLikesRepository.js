import Repository from './repository.js'

class CardLikesRepository extends Repository{
    constructor() {
        super("card_likes")
    }
}

const cardLikesRepository = new CardLikesRepository()

export default cardLikesRepository
