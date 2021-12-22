import 'mocha';
import * as should from 'should';

import * as Econ from '../economy';

it('makeOrder')
it('makeMarketOrder')

it('getOrdersByPrice', () => {
    const currencies = [
        'usd',
        'pln',
        // 'gold',
        // 'perf gem',
        // 'ist',
        // 'ber',
    ].map(c => {
        return new Econ.Currency(c);
    });
    const ex = new Econ.Exchange();
    ex.addMarkets([
        { base: currencies[0], quote: currencies[1] }
    ]);

    const mUsdPln = ex.markets[0];

    // mUsdPln.makeMarketOrder('buy', 100);
    // mUsdPln.makeOrder('buy', 100, 5);

    // cases:
    // usd/pln buy 100 @ 4 (cost = 400 pln)
    // ber/ist buy 2 @ 5 (cost = 10 ist)
    // buy shako for 2 ists

    mUsdPln.makeOrder('sell', 100, 5);
    mUsdPln.makeOrder('sell', 1000, 5.1);
    mUsdPln.makeOrder('sell', 100, 5.1);
    mUsdPln.makeOrder('sell', 200, 5.5);
    mUsdPln.makeOrder('sell', 100, 5.5);
    mUsdPln.makeOrder('sell', 200, 5);
    mUsdPln.makeOrder('sell', 2000, 5.5);
    mUsdPln.makeOrder('sell', 300, 5.1);

    should.equal(mUsdPln.sellOrdersFromLowestPrice.length, 8);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[0].id, 1);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[1].id, 6);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[2].id, 2);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[3].id, 3);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[4].id, 8);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[5].id, 4);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[6].id, 5);
    should.equal(mUsdPln.sellOrdersFromLowestPrice[7].id, 7);

    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice.length, 3);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[0].price, 5);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[0].amount, 300);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[0].orders.length, 2);
    should.deepEqual(mUsdPln.sellOrdersByPriceFromLowestPrice[0].orders.map(o => o.id), [1, 6]);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[1].price, 5.1);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[1].amount, 1400);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[1].orders.length, 3);
    should.deepEqual(mUsdPln.sellOrdersByPriceFromLowestPrice[1].orders.map(o => o.id), [2, 3, 8]);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[2].price, 5.5);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[2].amount, 2300);
    should.equal(mUsdPln.sellOrdersByPriceFromLowestPrice[2].orders.length, 3);
    should.deepEqual(mUsdPln.sellOrdersByPriceFromLowestPrice[2].orders.map(o => o.id), [4, 5, 7]);
});

it('', () => {
    // should.equal(mUsdPln.buyOrdersFromHighestPrice);
});

it('getTicker', () => {

});