// enemy AI types - non sentient, rabid, posessed etc

import { GameEvent } from "./game-store";

export namespace Data {
    export enum ItemSlot {
        Gold,
        Mixture,
        Helmet,
        Armor,
        Hand,
        Ring,
        Socket,
    }

    interface ItemCategoryBody {
        name: string;
        parent?: ItemCategory;
        size?: [number, number];
        slot?: ItemSlot;
    }

    export class ItemCategory {
        constructor(body: ItemCategoryBody) {

        }
    }

    class ItemConfig {
        // size: [number, number];
    }
}

interface ItemBody {
    // size: [number, number];
    readonly itemCategory: Data.ItemCategory;
}

export class Item {
    // readonly size: [number, number];
    readonly itemCategory: Data.ItemCategory;
    readonly socketsCount: number = 0;
    readonly socketItems: Item[] = [];

    constructor(body: ItemBody) {
        this.itemCategory = body.itemCategory;
    }

    putIntoSocket(item: Item) {
        if (this.socketsCount === 0) {
            throw new Error('this item does not have sockets');
        }

        if (this.socketItems.length === this.socketsCount) {
            throw new Error('no free sockets left');
        }

        this.socketItems.push(item);
    }

    putIntoSockets(items: Item[]) {
        for (let i = 0; i < items.length; i++) {
            this.putIntoSocket(items[i]);
        }
    }
}

interface WithSockets {

}

class ItemsGrid {
    private readonly items = new Map<Item, {x: number; y: number}>();

    addItem(item: Item, pos: {x: number; y: number}) {

    }

    removeItem(item: Item) {

    }
}

class ItemSpace {

}

class ItemsStats {
    plusHealth = 0;
    plusMana = 0;
    healthRegen = 0;
    manaRegen = 0;
    movementSpeed = 0;
    attackSpeed = 0;
    magicFind = 0;
    criticalHit = 0;
    resPhysical = 0;
    resFire = 0;
    resIce = 0;
    resArcane = 0;

    constructor(items: Item[]) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];



        }
    }
}

class HeroEquipment {
    readonly equipment = new ItemsGrid();
    readonly equipped = {
        helmet: new ItemSpace(),
        armor: new ItemSpace(),
        hand1: new ItemSpace(),
        hand2: new ItemSpace(),
        ring1: new ItemSpace(),
        ring2: new ItemSpace(),
    };

    equipHelmet(item: Item) {
        this.equipped.helmet = item;
    }

    equipArmor(item: Item) {
        this.equipped.armor = item;
    }

    equipHand1(item: Item) {
        this.equipped.hand1 = item;
    }

    equipHand2(item: Item) {
        this.equipped.hand2 = item;
    }

    equipRing1(item: Item) {
        this.equipped.ring1 = item;
    }

    equipRing2(item: Item) {
        this.equipped.ring2 = item;
    }
}

class Hero {
    experience: number = 0;
    readonly heroEquipment = new HeroEquipment();

    get level(): number {
        // this.experience;

        return 0;
    }
}

class Agent {
    readonly health = new Health();
}

class Health {
    points: number = 0;
    maxPoints: number = 100;

    readonly pointsUpdated = new GameEvent<this>();
    readonly died = new GameEvent();

    get isAlive(): boolean {
        return this.points > 0;
    }

    get isDead(): boolean {
        return this.points === 0;
    }

    setPoints(points: number) {
        this.points = points;

        if (this.points < 0) this.points = 0;
        if (this.points > this.maxPoints) this.points = this.maxPoints;

        this.pointsUpdated.emit(this);

        if (this.points === 0) {
            this.died.emit();
        }
    }

    takeDamage(points: number) {
        this.setPoints(this.points - points);
    }
}