import Repository from './repository.js'

class TradeOfferItemsRepository extends Repository{
    constructor() {
        super("trade_offer_items")
    }
}

const tradeOfferItemsRepository = new TradeOfferItemsRepository()

export default tradeOfferItemsRepository
