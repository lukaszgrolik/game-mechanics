import * as EventEmitter from 'events';
import { IStorageExchange } from './storage';

// cases of derived values

// cases of events
// residence can upgrade/downgrade based on requirements (residents, stored resources) and elapsed time

class GameEngine {
    loop = (deltaTime: number) => {

    };

    setLoopFn(fn: (deltaTime: number) => void) {
        this.loop = fn;
    }

    start() {
        const interval = 100;
        setInterval(() => {
            this.loop(interval / 1000);
        }, interval);
    }
}

interface IEngineTime {
    readonly deltaTime: number;
}

class Game implements IEngineTime {
    deltaTime = -1;

    update(deltaTime: number) {
        this.deltaTime = deltaTime;
    }
}

class Producer {
    constructor(private readonly storage: Storage) {

    }
}

class Consumer {

}

class Owner {

}

export namespace DataDef {
    export class Resource {

    }
}

class Residence {
    residents = 0;

}

class Resource {

}

const game = new Game();

const gameEngine = new GameEngine();

gameEngine.setLoopFn(game.update);
gameEngine.start();

//
//
// storages manager system
//
//

// assigns_existing_storagable_at_start
// does_not_assign_existing_storagables_out_of_radius_at_start
// assigns_newly_added_storagable
// does_not_assing_newly_added_storagable_out_of_radius
// drops_newly_deleted_storagable
// assigns_existing_unassigned_storagable_to_newly_added_manager
// does_not_assign_existing_unassigned_storagable_to_newly_added_manager_out_of_radius
// reassigns_existing_storagable_to_newly_added_manager
// reassigns_existing_storagable_from_newly_deleted_manager
// assigns_storagable_of_given_type
// does_not_assign_storagable_of_wrong_type

//
//
// construction system
//
//

class ConstructionSystem {
    readonly constructions: Construction[] = [];

    create() {

    }

    delete() {

    }
}

class Construction {

}