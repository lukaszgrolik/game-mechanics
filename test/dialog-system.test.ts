import 'mocha';
import * as should from 'should';

import * as GameData from '../src/arpg-store/game-data';
import { GameStore, Quest, Act, Npc, QuestStatus, Agent } from '../src/arpg-store/game-store';

describe('', () => {

    // test

    it('', () => {
        const actData = new GameData.Act();
        const gameStore = new GameStore({
            acts: [actData]
        });
        const act = gameStore.acts[0];

        const npcDataAkara = new GameData.Npc({
            name: 'Akara',
            dialogs: [
                {
                    important: true,
                    once: true,
                    text: `Hello I'm Akara`,
                    enabled: () => true,
                },

                {
                    important: true,
                    once: true,
                    text: `Our rogues noticed increased presence of monsters. Go to the cave outside the encampment and try to clear the place.`,
                    enabled: () => {
                        return act.quests[0].status === QuestStatus.Unstarted;
                    },
                    onAfter: () => {
                        const quest = act.quests[0];

                        quest.setActiveTask(quest.tasks[0]);
                    },
                },
                {
                    important: false,
                    text: `<akara gossip>`,
                    enabled: () => true,
                },
                {
                    important: false,
                    text: `<akara more about den of evil>`,
                    enabled: () => true,
                },
                {
                    important: true,
                    once: true,
                    text: `Your courage saved our encampment. As a reward I'll teach you a new skill.`,
                    enabled: () => {
                        const quest = act.quests[0];

                        return quest.activeTask === quest.tasks[quest.tasks.length - 1];
                    },
                    onAfter: () => {
                        // mark quest done
                    },
                },
                {
                    important: false,
                    text: `<akara about blood raven>`,
                    enabled: () => true,
                },
                {
                    important: true,
                    once: true,
                    text: `Evil monsters imprisoned our friend Deckard Cain. Free him`,
                    enabled: () => {
                        return act.quests[0].finished && act.quests[2].started === false;
                    },
                },
            ],
        });

        const npc = new Npc(npcDataAkara);

        should.equal(npc.importantMessages.length, 1);

        const playerAgent = new Agent();

        npc.handleInteraction(playerAgent);

        should.equal(npc.importantMessages.length, 0);

    });

    it('', () => {
        // there are npc
        // with some you can talk, have multiple dialog options; sometimes you select dialog option, otherwise they start talking upon contact
        // available dialog options change throughout quests progress

        const actData = new GameData.Act();
        const gameStore = new GameStore({
            acts: [actData]
        });
        const act = gameStore.acts[0];

        const npcDataAkara = new GameData.Npc({
            name: 'Akara',
            dialogs: [
                {
                    important: true,
                    text: `Hello I'm Akara`,
                    enabled: () => true,
                },
                {
                    important: true,
                    text: `Our rogues noticed increased presence of monsters. Go to the cave outside the encampment and try to clear the place.`,
                    enabled: () => true,
                },
                {
                    important: false,
                    text: `<akara gossip>`,
                    enabled: () => true,
                },
                {
                    important: false,
                    text: `<akara more about den of evil>`,
                    enabled: () => true,
                },
                {
                    important: true,
                    text: `Your courage saved our encampment. As a reward I'll teach you a new skill.`,
                    enabled: () => true,
                },
                {
                    important: false,
                    text: `<akara about blood raven>`,
                    enabled: () => true,
                },
                {
                    important: true,
                    text: `Evil monsters imprisoned our friend Deckard Cain. Free him`,
                    enabled: () => {
                        // 'quest finished ACT_1/BLOOD_RAVEN && quest not started ACT_1/TRISTRAM_RESCUE '
                        return true;
                    },
                },
            ],
        });

        const npcAkara = new Npc(npcDataAkara);

        new GameData.Npc({
            name: 'Kashya',
            dialogs: [
                {
                    important: true,
                    once: true,
                    text: `Hello I'm Kashya`,
                    enabled: () => true,
                },
                {
                    important: false,
                    text: `<kashya gossip>`,
                    enabled: () => true,
                },
                {
                    important: false,
                    text: `<kashya about den of evil>`,
                    enabled: () => {
                        const q = act.quests[0];

                        return q.started && q.finished === false;
                        // return q.status === 'IN_PROGRESS';
                    }
                },
                {
                    important: true,
                    once: true,
                    text: `My rogues told me about horrible things happening at the cemetery. Blood Raven must be killed`,
                    enabled: () => {
                        return act.quests[0].finished;
                    },
                },
                {
                    important: false,
                    text: `<kashya more about blood raven>`,
                    enabled: () => {
                        return act.quests[1].status === QuestStatus.InProgress;
                    },
                },
                {
                    important: true,
                    once: true,
                    text: `You have released Blood Raven from demonic grasp. Now she can rest in peace. As a sign of our gratitude one of our rogues from now on will accompany you.`,
                    enabled: () => {
                        return act.quests[1].status === QuestStatus.Finished;
                    },
                }
            ],
        });

        const locDataLutGholein = new GameData.Location();
        const player = new Agent();

        new GameData.Npc({
            name: 'Warriv',
            dialogs: [
                {
                    important: true,
                    once: true,
                    text: `I'm Warriv. Strange things have been happenning`,
                    enabled: () => true,
                },
                {
                    important: true,
                    once: true,
                    text: `My caravan is ready to go east`,
                    enabled: () => {
                        const q = act.quests[5];
                        const locLutGholein = gameStore.locations.find(loc => loc.locationData === locDataLutGholein);
                        if (!locLutGholein) throw new Error('location not found');

                        return q.status === QuestStatus.Finished && player.discoveredLocations.includes(locLutGholein) === false;
                    }
                },
            ],
        });

        // npc menu options - trade, talk options (gossip, "den of evil", "blood raven"), go east
    });

});