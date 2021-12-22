import * as EventEmitter from 'events';

import * as GameData from './game-data';

type GameEventFn<T> = (val: T) => void;
export class GameEvent<T = void> {
    readonly #listeners: GameEventFn<T>[] = [];

    addListener(fn: GameEventFn<T>) {
        this.#listeners.push(fn);
    }

    removeListener(fn: GameEventFn<T>) {
        const index = this.#listeners.indexOf(fn);

        if (index !== -1) {
            this.#listeners.splice(index, 1);
        }
    }

    emit(val: T) {
        for (let i = 0; i < this.#listeners.length; i++) {
            const fn = this.#listeners[i];

            fn(val);
        }
    }
}

enum QuestTaskType {
    KILL_ENEMY,
    KILL_ALL_ENEMIES_IN_LOCATION,
    FIND_ITEM,
    BRING_ITEM_TO_NPC,
    TALK_WITH_NPC,
    INTERACT_WITH_OBJECT,
    GO_TO_LOCATION
}

enum QuestActivationCriteria {
    TALKED_WITH_NPC,
    ENTERED_LOCATION,
    DISCOVERED_LOCATION,
    FOUND_ITEM,
}
// activation criteria
// den of evil - talk with akara | enter den of evil
// blood raven - talk with kashya after finishing q1 |

export enum QuestStatus {
    Unstarted,
    InProgress,
    Finished
}

export class Quest {
    title = '';
    tasks: QuestTask[] = [];
    // activationCriteria: QuestActivationCriteria;

    // #started = false;
    // #finished = false;
    #status: QuestStatus = QuestStatus.Unstarted;
    #activeTask: QuestTask = this.tasks[0];

    constructor(readonly gameStore: GameStore, readonly act: Act, readonly questData: GameData.Quest) {
        questData.tasks.forEach(taskData => {
            const task = new QuestTask(this, taskData);
            this.tasks.push(task);

            const res = taskData.activationHandler(() => {
                this.#activeTask = task;
            }, this.gameStore);

            // if (typeof res === 'function') {
            //     res();
            // }
        });
    }

    get status() {
        return this.#status;
    }

    get started() {
        // this.tasks
        return this.#status !== QuestStatus.Unstarted;
    }

    get finished() {
        return this.#status === QuestStatus.Finished;
    }

    get activeTask() {
        return this.#activeTask;
    }

    setActiveTask(task: QuestTask) {
        this.#activeTask = task;
    }

    // activateNextTask() {
    //     const index = this.tasks.indexOf(this.#activeTask);

    //     if (index < this.tasks.length - 1) {
    //         const nextTask = this.tasks[index + 1];
    //         this.#activeTask = nextTask;

    //         nextTask.started.emit();

    //     }
    //     else {
    //         this.#status = QuestStatus.Finished;
    //     }
    // }
}

class QuestTask {
    constructor(readonly quest: Quest, readonly questTaskData: GameData.QuestTask) {

    }

    // markDone() {
    //     this.quest.activateNextTask();
    // }
}

export class Npc {
    readonly name = '';

    readonly importantMessages: string[] = [];
    readonly interactedWithPlayer = new GameEvent();

    constructor(readonly npcData: GameData.Npc) {

    }

    handleInteraction(agent: Agent) {

    }
}

export class Agent {
    readonly discoveredLocations: Location[] = [];

    readonly discoveredLocation = new GameEvent<{location: Location}>();
}

export class Act {
    readonly quests: Quest[] = [];
    readonly locations: Location[] = [];

    constructor(readonly gameStore: GameStore, readonly actData: GameData.Act) {

    }

    get questsStarted() {
        return this.quests.filter(q => q.started);
    }

    get questsFinished() {
        return this.quests.filter(q => q.finished);
    }
}

class Location {
    readonly npcs: Npc[] = [];
    // size;
    // subLocations;

    readonly enemies: Agent[] = [];
    readonly aliveEnemies: Agent[] = [];

    readonly enemyKilled = new GameEvent();

    constructor(readonly gameStore: GameStore, readonly locationData: GameData.Location) {

    }
}

interface GameStoreBody {
    acts: GameData.Act[];
}

export class GameStore {
    readonly acts: Act[] = [];

    constructor(readonly body: GameStoreBody) {
        this.acts = body.acts.map(act => {
            return new Act(this, act);
        });
    }

    get locations(): Location[] {
        return this.acts.map(a => a.locations).flat();
    }

}

