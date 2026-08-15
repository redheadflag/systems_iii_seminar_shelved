import Repository from './repository.js'

class TradeOfferRepository extends Repository{
    constructor() {
        super("trade_offer")
    }
}

const tradeOfferRepository = new TradeOfferRepository()

export default tradeOfferRepository
