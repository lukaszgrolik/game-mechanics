// withdraw from one, deposit to another
// book res, then withdraw | cancel booked res if failed to withdraw
// book space, then deposit | cancel booked space if failed to deposit

import { List } from "../../utils";
import { DataDef } from "./ecognomy";
import { IStorageBooking, IStorageExchange } from "./storage";

export interface ITransactionSystemCreate {
    create(transactionBody: TransactionCtorBody): Transaction;
}

export class TransactionSystem implements ITransactionSystemCreate {
    readonly pendingTransactions: List<Transaction>;

    constructor(pendingTransactions: List<Transaction>) {
        this.pendingTransactions = pendingTransactions || [];
    }

    create(transactionBody: TransactionCtorBody): Transaction {
        const ta = new Transaction(transactionBody);
        ta.setup();

        this.pendingTransactions.add(ta);

        return ta;
    }

    commit(transaction: Transaction) {
        transaction.commit();

        this.pendingTransactions.remove(transaction);
    }

    cancel(transaction: Transaction) {
        transaction.cancel();

        this.pendingTransactions.remove(transaction);
    }
}

// class TransactionOperation {
//     constructor(
//         readonly from: IStorageOperations & IStorageBooking,
//         readonly to: IStorageOperations & IStorageBooking,
//         readonly withdraw: Map<Resource, number>,
//         readonly deposit: Map<Resource, number>,
//     ) {

//     }
// }

export interface ITransactionActions {
    setup(): void;
    commit(): void;
    cancel(): void;
}

type TransactionCtorBody = {
    readonly from: IStorageExchange & IStorageBooking,
    readonly to: IStorageExchange & IStorageBooking,
    readonly withdraw: Map<DataDef.Resource, number>,
    readonly deposit: Map<DataDef.Resource, number>,
}

class Transaction implements ITransactionActions {
    readonly from: IStorageExchange & IStorageBooking;
    readonly to: IStorageExchange & IStorageBooking;
    readonly withdraw: Map<DataDef.Resource, number>;
    readonly deposit: Map<DataDef.Resource, number>;

    constructor(
        body: TransactionCtorBody
    ) {
        this.from = body.from;
        this.to = body.to;
        this.withdraw = body.withdraw;
        this.deposit = body.deposit;
    }

    setup() {
        if (this.withdraw.size > 0) {
            this.from.bookSpace();
            this.to.bookResource();
        }

        if (this.deposit.size > 0) {
            this.from.bookResource();
            this.to.bookSpace();
        }
    }

    commit() {
        if (this.withdraw.size > 0) {
            this.from.deposit();
            this.to.withdraw();
        }

        if (this.deposit.size > 0) {
            this.from.withdraw();
            this.to.deposit();
        }
    }

    cancel() {
        if (this.withdraw.size > 0) {
            this.from.unbookSpace();
            this.to.unbookResource();
        }

        if (this.deposit.size > 0) {
            this.from.unbookResource();
            this.to.unbookSpace();
        }
    }
}