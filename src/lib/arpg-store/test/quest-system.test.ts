// import 'mocha';
// import * as should from 'should';

// import * as GameData from '../src/arpg-store/game-data';
// import { GameStore, Quest, Act, Agent } from '../src/arpg-store/game-store';

// describe('', () => {

//     // @todo test ensure doesnt activate previous quest task
//     // @todo test having some quest task already done
//     // @todo test having some quest already done

//     it('', () => {
//         const actData = new GameData.Act();
//         const questData = new GameData.Quest({
//             title: '',
//             tasks: [
//                 {
//                     info: '',
//                     activationHandler: () => {

//                     }
//                 },
//                 {
//                     info: '',
//                     activationHandler: (activate) => {
//                         activate();
//                     }
//                 },
//                 {
//                     info: '',
//                     activationHandler: () => {

//                     }
//                 },
//             ],
//             finishHandler: () => {

//             },
//         });

//         const gameStore = new GameStore({acts: [actData]});
//         const act = gameStore.acts[0];

//         const quest = new Quest(gameStore, act, questData);

//         quest.activeTask === quest.tasks[1];
//     });

//     it('', () => {

//         const npcAkara = new GameData.Npc({
//             name: 'Akara',
//         });
//         const npcKashya = new GameData.Npc({
//             name: 'Kashya',
//         });
//         const npcWarriv = new GameData.Npc({
//             name: 'Warriv',
//         });
//         const npcDeckard = new GameData.Npc({
//             name: 'Deckard Cain',
//         });

//         const locRoguesEncampment = new GameData.Location({
//             title: 'Rogues Encampment',
//             npcs: [
//                 npcWarriv,
//                 npcAkara,
//                 npcKashya,
//             ],
//         });
//         const locBloodMoor = new GameData.Location({
//             title: 'Blood Moor'
//         });
//         const locBloodMoorCave = new GameData.Location({
//             title: 'Blood Moor Cave'
//         });
//         const locStoneField = new GameData.Location({
//             title: 'Stone Field'
//         });
//         const locDarkWood = new GameData.Location({
//             title: 'Dark Wood'
//         });
//         const locTristram = new GameData.Location({
//             title: 'Tristram'
//         });
//         const locCatacombs = new GameData.Location({
//             title: 'Catacombs'
//         });

//         const agent = new Agent();

//         const questDenOfEvil = new GameData.Quest({
//             title: 'Den of Evil',
//             tasks: [
//                 {
//                     info: 'find den of evil',
//                     // type: QuestTaskType.GO_TO_LOCATION,
//                     activationHandler: (activate) => {
//                         const interactedWithPlayerFn = () => {
//                             // task.markDone();
//                             activate();
//                         };

//                         npcAkara.interactedWithPlayer.addListener(interactedWithPlayerFn);

//                         return () => {
//                             npcAkara.interactedWithPlayer.removeListener(interactedWithPlayerFn)
//                         };
//                     },
//                 },
//                 {
//                     info: 'kill all monsters',
//                     // type: QuestTaskType.KILL_ALL_ENEMIES_IN_LOCATION,
//                     activationHandler: (activate) => {
//                         agent.discoveredLocation.addListener(e => {
//                             if (e.location.locationData === locBloodMoorCave) {
//                                 // task.markDone();
//                                 activate();
//                             }
//                         });
//                     },
//                 },
//                 {
//                     info: 'go to akara for reward',
//                     // type: QuestTaskType.TALK_WITH_NPC,
//                     activationHandler: (activate, gameStore) => {
//                         const loc = gameStore.acts[0].locations.find(loc => loc.locationData === locBloodMoorCave);
//                         if (!loc) throw new Error('location not found');

//                         loc.enemyKilled.addListener((agent) => {
//                             if (loc.aliveEnemies.length === 0) {
//                                 // task.markDone();
//                                 activate();
//                             }
//                         });
//                     },
//                 },
//             ],
//             finishHandler: (finished) => {
//                 npcAkara.interactedWithPlayer.addListener(() => {
//                     // task.markDone();
//                     finished();
//                 });
//             },
//         });
//         const questBloodRaven = new GameData.Quest({
//             title: 'Blood Raven',
//             tasks: [

//             ],
//             finishHandler: (finish) => {

//             },
//         });
//         const questTristramRescue = new GameData.Quest({
//             title: 'Tristram Rescue',
//             tasks: [
//                 {
//                     info: 'find tree in dark wood',
//                     // type: QuestTaskType.FIND_ITEM,
//                     activationHandler: (activate) => {

//                     },
//                 },
//                 {
//                     info: 'bring magic scroll to akara',
//                     // type: QuestTaskType.TALK_WITH_NPC,
//                     activationHandler: (activate) => {

//                     },
//                 },
//                 {
//                     info: 'use magic scroll to open portal to tristram',
//                     // type: QuestTaskType.INTERACT_WITH_OBJECT,
//                     activationHandler: (activate) => {

//                     },
//                 },
//                 {
//                     info: 'rescue deckard cain',
//                     // type: QuestTaskType.INTERACT_WITH_OBJECT,
//                     activationHandler: (activate) => {

//                     },
//                 },
//                 {
//                     info: 'talk with deckard cain',
//                     // type: QuestTaskType.TALK_WITH_NPC,
//                     activationHandler: (activate) => {

//                     },
//                 },
//             ],
//             finishHandler: (finish) => {

//             },
//         });
//         const questAndariel = new GameData.Quest({
//             title: 'Andariel',
//             tasks: [],
//             finishHandler: (finish) => {

//             },
//         });
//         const act1Data = new GameData.Act({
//             quests: [
//                 questDenOfEvil,
//                 questBloodRaven,
//                 questTristramRescue,
//                 questAndariel,
//             ]
//         });
//         const act2Data = new GameData.Act({
//             quests: [

//             ]
//         });

//         const gameStore = new GameStore({
//             acts: [
//                 act1Data,
//                 act2Data,
//             ],
//         });

//         should.equal(gameStore.acts.length, 2);
//         const firstAct = gameStore.acts[0];
//         const secondAct = gameStore.acts[1];
//         should.equal(firstAct.questsStarted.length, 0);
//         should.equal(secondAct.questsStarted.length, 0);

//         // after talks to akara
//         should.equal(firstAct.questsStarted.length, 1);

//         const firstQuest = firstAct.quests[0];
//         should.equal(firstQuest.title, 'Den of Evil');
//         should.equal(firstQuest.started, true);
//         should.equal(firstQuest.activeTask, firstQuest.tasks[0]);

//         // after walks into location
//         should.equal(firstQuest.activeTask, firstQuest.tasks[1]);

//         // after kills all monsters
//         should.equal(firstQuest.activeTask, firstQuest.tasks[2]);

//         // after talks to akara
//         should.equal(firstQuest.activeTask, firstQuest.tasks[2]);
//         should.equal(firstQuest.finished, true);
//         should.equal(firstAct.questsStarted.length, 1);
//         should.equal(firstAct.questsFinished.length, 1);

//         // after talks to kashya
//         should.equal(firstAct.questsStarted.length, 2);
//         should.equal(firstAct.questsFinished.length, 1);

//         const secondQuest = firstAct.quests[1];
//         should.equal(secondQuest.title, 'Blood Raven');
//         should.equal(secondQuest.started, true);
//         should.equal(secondQuest.activeTask, secondQuest.tasks[0]);

//     });

// });