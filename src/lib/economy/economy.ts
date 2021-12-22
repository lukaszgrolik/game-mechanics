
export class CurrencyBalance {
    readonly id = 1;

    amount = 0;

    constructor(readonly currency: Currency) {

    }
}

export class Account {
    readonly id = 1;

    readonly currencyBalances: CurrencyBalance[] = [];

    placeItem() {
        // type - offer (price)
        // type - auction (end date, min price)
    }

    buyItem(itemId: ItemId) {

    }

    bidItem(itemId: ItemId, price: number) {

    }
}

export class Shop {
    readonly id = 1;

    readonly itemCategories: ItemCategory[] = [];
}

type ItemCategoryId = number;
export class ItemCategory {
    readonly id = 1;

    constructor(body: {name: string, parentId: ItemCategoryId | null}) {

    }

    // get ancestors(): ItemCategory[] {

    // }

    // get parent(): ItemCategory | null {

    // }

    // get children(): ItemCategory[] {

    // }
}

type ItemId = number;
export class Item {
    readonly id = 1;

    itemCategoryId: ItemCategoryId | null;

    constructor(readonly shop: Shop, body: {name: string; itemCategoryId: ItemId}) {
        this.itemCategoryId = body.itemCategoryId;
    }

    get itemCategory(): ItemCategory | null {
        if (!this.itemCategoryId) return null;

        const found = this.shop.itemCategories.find(cat => cat.id === this.itemCategoryId);
        if (!found) throw new Error(`item category not found for id=${this.itemCategoryId}`);

        return found;
    }
}

export class Exchange {
    readonly id = 1;

    markets: Market[] = [];

    addMarket(base: string, quote: string) {

    }

    addMarkets(markets: {}[]) {

    }
}

export class Currency {
    readonly id = 1;

    constructor(name: string) {

    }
}

export class Market {
    readonly id = 1;

    readonly orders: Order[] = [];
    // activeOrdersIds: number[] = [];

    constructor(base: string, quote: string) {

    }

    get activeOrders(): Order[] {
        return this.orders;
    }

    get sellOrdersFromLowestPrice(): Order[] {
        return this.orders.slice().sort((a, b) => a.price - b.price);
    }

    get buyOrdersFromHighestPrice(): Order[] {
        return this.orders.slice().sort((a, b) => b.price - a.price);
    }

    get sellOrdersByPriceFromLowestPrice(): {price: number; amount: number; orders: Order[]}[] {
        return this.getOrdersByPrice(this.sellOrdersFromLowestPrice);
    }

    get sellAmount() {
        return this.sellOrdersFromLowestPrice.reduce((prev, order) => {
            return prev + order.amount;
        }, 0);
    }

    get buyAmount() {
        return this.buyOrdersFromHighestPrice.reduce((prev, order) => {
            return prev + order.amount;
        }, 0);
    }

    private getOrdersByPrice(orders: Order[]): {price: number; amount: number; orders: Order[]}[] {
        const x = {
            price: 0,
            amount: 0,
            orders: [],
        };

        return [];
    }

    makeOrder(type: OrderType, amount: number, price: number) {
        const order = new Order({
            type,
            amount,
            price,
        });

        this.orders.push(order);
    }

    makeMarketOrder(type: OrderType, amount: number) {
        const price = 0;
        const order = new Order({
            type,
            amount,
            price,
        });

        this.orders.push(order);
    }

    getTicker(): {last: number; buy: number; sell: number} {
        return {
            last: 0,
            buy: 0,
            sell: 0,
        };
    }
}

type OrderType = 'buy' | 'sell';

export class Order {
    readonly id = 1;

    readonly type: OrderType;
    readonly amount: number;
    readonly price: number;

    constructor(body: {type: OrderType, amount: number, price: number}) {
        this.type = body.type;
        this.amount = body.amount;
        this.price = body.price;
    }
}

