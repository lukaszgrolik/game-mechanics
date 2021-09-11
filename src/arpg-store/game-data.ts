import { GameEvent, GameStore } from "./game-store";

interface ActBody {
    readonly quests?: Quest[];
}

export class Act {
    readonly quests: Quest[] = [];

    constructor(readonly body: ActBody = {}) {
        if (body.quests !== undefined) this.quests = body.quests;
    }
}

interface LocationBody {
    readonly title?: string;
    readonly npcs?: Npc[];
}

export class Location {
    readonly title: string = '';
    readonly hasWaypoint = false;
    readonly npcs: Npc[] = [];

    constructor(body: LocationBody = {}) {
        if (body.title !== undefined) this.title = body.title;
        if (body.npcs !== undefined) this.npcs = body.npcs;
    }
}

interface NpcDialog {
    important: boolean;
    once?: boolean;
    text: string;
    enabled: () => boolean;
    onAfter?: () => void;
}

interface NpcBody {
    readonly name?: string;
    readonly dialogs?: NpcDialog[];
}

export class Npc {
    readonly name: string = '';
    readonly dialogs: NpcDialog[] = [];

    readonly interactedWithPlayer = new GameEvent();

    constructor(body: NpcBody = {}) {
        if (body.name !== undefined) this.name = body.name;
        if (body.dialogs !== undefined) this.dialogs = body.dialogs;
    }
}

interface QuestBody {
    readonly title: string;
    readonly tasks: QuestTaskBody[];
    readonly finishHandler: (finish: () => void) => void;
}

export class Quest {
    readonly title: string = '';
    readonly tasks: QuestTask[] = [];
    readonly finishHandler: (finish: () => void) => void;

    constructor(readonly body: QuestBody) {
        this.title = body.title;
        this.tasks = body.tasks.map(t => new QuestTask(t));
        this.finishHandler = body.finishHandler;
    }
}

type ActivationHandlerFn = (activate: () => void, gameStore: GameStore) => (void | (() => void));

interface QuestTaskBody {
    // readonly type?: QuestTaskType;
    readonly info: string;
    // readonly onStarted?: (gameStore: GameStore, task: QuestTask) => void;
    readonly activationHandler: ActivationHandlerFn;
}


export class QuestTask {
    readonly info: string;
    readonly activationHandler: ActivationHandlerFn;

    constructor(readonly body: QuestTaskBody) {
        this.info = body.info;
        this.activationHandler = body.activationHandler;
    }
}