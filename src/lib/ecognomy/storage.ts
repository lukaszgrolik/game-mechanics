import { DataDef } from "./ecognomy";

export interface IStorageExchange {
    deposit(): void;
    withdraw(): void;
}

export interface IStorageBooking {
    bookResource(): void;
    unbookResource(): void;
    bookSpace(): void;
    unbookSpace(): void;
}

export class Storage implements IStorageExchange, IStorageBooking {
    private readonly _resources = new Map<DataDef.Resource, number>();
    public get resources(): ReadonlyMap<DataDef.Resource, number> {
        return this._resources;
    }

    deposit() {

    }

    withdraw() {

    }

    bookResource() {

    }

    unbookResource() {

    }

    bookSpace() {

    }

    unbookSpace() {

    }

}