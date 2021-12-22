// import 'mocha';
// import * as should from 'should';

// import * as GameData from '../src/arpg-store/game-data';
// import { GameStore, Quest, Act, Npc } from '../src/arpg-store/game-store';
// import { Item, Data } from '../src/arpg-store/agent-system';
// import * as random from '../src/random';



// const itemCategoryGold = new Data.ItemCategory({
//     name: 'Gold',
//     slot: Data.ItemSlot.Gold,
// });
// const itemCategoryArrows = new Data.ItemCategory({
//     name: 'Arrows',
//     size: [1, 2],
//     slot: Data.ItemSlot.Hand,
// });
// const itemCategoryMixture = new Data.ItemCategory({
//     name: 'Mixture',
//     size: [1, 1],
//     slot: Data.ItemSlot.Mixture,
// });
// new Data.ItemCategory({
//     name: 'Health potion',
//     parent: itemCategoryMixture,
// });
// new Data.ItemCategory({
//     name: 'Mana potion',
//     parent: itemCategoryMixture,
// });

// enum GemQuality {
//     Chipped,
//     Flawed,
//     Regular,
//     Flawless,
//     Perfect,
// }

// const itemCategoryGem = new Data.ItemCategory({
//     name: 'Gem',
//     size: [1, 1],
//     slot: Data.ItemSlot.Socket,
// });
// const itemCategoryGems = {
//     ruby: new Data.ItemCategory({
//         name: 'Ruby',
//         parent: itemCategoryGem,
//     }),
//     emerald: new Data.ItemCategory({
//         name: 'Emerald',
//         parent: itemCategoryGem,
//     }),
//     sapphire: new Data.ItemCategory({
//         name: 'Sapphire',
//         parent: itemCategoryGem,
//     }),
//     gemTopaz: new Data.ItemCategory({
//         name: 'Topaz',
//         parent: itemCategoryGem,
//     }),
//     diamond: new Data.ItemCategory({
//         name: 'Diamond',
//         parent: itemCategoryGem,
//     }),
//     amethyst: new Data.ItemCategory({
//         name: 'Amethyst',
//         parent: itemCategoryGem,
//     }),
// };

// const itemCategoryRune = new Data.ItemCategory({
//     name: 'Rune',
//     size: [1, 1],
//     slot: Data.ItemSlot.Socket,
// });
// const itemCategoryRunes = {
//     el: new Data.ItemCategory({
//         name: 'El rune',
//         parent: itemCategoryRune,
//     }),
//     tir: new Data.ItemCategory({
//         name: 'Tir rune',
//         parent: itemCategoryRune,
//     }),
//     sol: new Data.ItemCategory({
//         name: 'Sol rune',
//         parent: itemCategoryRune,
//     }),
//     ral: new Data.ItemCategory({
//         name: 'Ral rune',
//         parent: itemCategoryRune,
//     }),
//     ko: new Data.ItemCategory({
//         name: 'Ko rune',
//         parent: itemCategoryRune,
//     }),
//     ist: new Data.ItemCategory({
//         name: 'Ist rune',
//         parent: itemCategoryRune,
//     }),
//     ber: new Data.ItemCategory({
//         name: 'Ber rune',
//         parent: itemCategoryRune,
//     }),
//     cham: new Data.ItemCategory({
//         name: 'Cham rune',
//         parent: itemCategoryRune,
//     }),
//     zod: new Data.ItemCategory({
//         name: 'Zod rune',
//         parent: itemCategoryRune,
//     }),
// }

// const itemCategoryJewel = new Data.ItemCategory({
//     name: 'Jewel',
//     size: [1, 1],
//     slot: Data.ItemSlot.Socket,
// });

// const itemCategoryRing = new Data.ItemCategory({
//     name: 'Ring',
//     slot: Data.ItemSlot.Ring,
//     size: [1, 1],
// });

// const itemCategoryHelmet = new Data.ItemCategory({
//     name: 'Helmet',
//     slot: Data.ItemSlot.Helmet,
//     size: [2, 3],
// });
// const itemCategoryArmor = new Data.ItemCategory({
//     name: 'Armor',
//     slot: Data.ItemSlot.Armor,
//     size: [2, 3],
// });
// const itemCategoryLightArmor = new Data.ItemCategory({
//     name: 'Light Armor',
//     parent: itemCategoryArmor,
// });
// const itemCategoryMediumArmor = new Data.ItemCategory({
//     name: 'Medium Armor',
//     parent: itemCategoryArmor,
// });
// const itemCategoryHeavyArmor = new Data.ItemCategory({
//     name: 'Heavy Armor',
//     parent: itemCategoryArmor,
// });
// const itemCategoryShield = new Data.ItemCategory({
//     name: 'Shield',
//     slot: Data.ItemSlot.Hand,
// });

// // leather armor
// // ringmail armor
// // plate armor

// const itemCategoryWeapon = new Data.ItemCategory({
//     name: 'Weapon',
//     slot: Data.ItemSlot.Hand,
// });
// const itemCategorySword = new Data.ItemCategory({
//     name: 'Sword',
//     parent: itemCategoryWeapon,
// });
// new Data.ItemCategory({
//     name: 'Axe',
//     parent: itemCategoryWeapon,
// });
// const itemCategoryWand = new Data.ItemCategory({
//     name: 'Wand',
//     parent: itemCategoryWeapon,
// });
// const itemCategoryStaff = new Data.ItemCategory({
//     name: 'Staff',
//     parent: itemCategoryWeapon,
// });
// new Data.ItemCategory({
//     name: 'Bow',
//     parent: itemCategoryWeapon,
// });

// const itemCategoryShortSword = new Data.ItemCategory({
//     name: 'Short sword',
//     parent: itemCategorySword,
//     size: [1, 3],
//     weaponConfig: {
//         requiredStrength: 15,
//         damage: [4, 7],
//         attackSpeed: 2,
//         range: 1.2,
//     },
// });
// const itemCategoryLongSword = new Data.ItemCategory({
//     name: 'Long sword',
//     parent: itemCategorySword,
//     size: [1, 4],
//     weaponConfig: {
//         twoHanded: true,
//         requiredStrength: 35,
//         damage: [7, 12],
//         attackSpeed: 1.5,
//         range: 1.6,
//     },
// });
// const itemCategoryCrystalSword = new Data.ItemCategory({
//     name: 'Crystal sword',
//     parent: itemCategorySword,
//     size: [2, 3],
//     weaponConfig: {
//         requiredStrength: 25,
//         damage: [5, 10],
//         attackSpeed: 1.8,
//         range: 1.4,
//     }.
// });

// new Data.ItemCategory({
//     name: 'Wooden wand',
//     parent: itemCategoryWand,
//     size: [1, 2],
//     weaponConfig: {
//         damage: [1, 2],
//         attackSpeed: 2,
//         range: .5,
//     },
// });
// new Data.ItemCategory({
//     name: 'Wooden staff',
//     parent: itemCategoryStaff,
//     // weaponModifie
//     size: [1, 4],
//     weaponConfig: {
//         twoHanded: true,
//         requiredStrength: 15,
//         damage: [3, 6],
//         attackSpeed: 1.2,
//         range: 2,
//     },
// });

// new Data.ItemCategory({
//     name: 'Small shield',
//     parent: itemCategoryShield,
//     size: [2, 2],
//     shieldConfig: {
//         requiredStrength: 15,
//     },
// });
// new Data.ItemCategory({
//     name: 'Large shield',
//     parent: itemCategoryShield,
//     size: [2, 3],
//     shieldConfig: {
//         requiredStrength: 25,
//     },
// });

// function getRandomGem() {
//     const itemCat = random.sample(Object.values(itemCategoryGems));

//     // quality: chipped, flawed, regular, flawless, perfect

//     return new Item({
//         itemCategory: itemCat,
//     })
// }

// function getRandomRing() {
//     // [step] how many modifiers

//     // [step] modifiers values

//     const modifiers = {
//         plusHealth: random.range(0, 10),
//         plusMana: random.range(0, 10),
//         healthRegen: random.range(0, 3),
//         manaRegen: random.range(0, 3),
//         movementSpeed: random.range(0, 20),
//         attackSpeed: random.range(0, 20),
//         magicFind: random.range(0, 50),
//         criticalHit: random.range(0, 25),
//         resPhysical: random.range(0, 25),
//         resFire: random.range(0, 25),
//         resIce: random.range(0, 25),
//         resArcane: random.range(0, 25),
//     };

//     return new Item({
//         itemCategory: itemCategoryRing,
//     });
// }

// // item category (ring, sword), type (normal, magic, unique), modifiers
// function randomSingleDrop() {
//     // [step] whether to drop gold, potions, arrows

//     // [step] whether to drop gems

//     // [step] whether to drop weapons, armor, rings
// }

// function randomMultiDrop() {
//     // [step] whether to drop gold, potions, arrows

//     // [step] whether to drop runes & how many

//     // [step] how many items to drop - normal dist 0-x

//     // [step] what categories of item to drop (only 1 per category)
// }

// function randomItemIdentification() {
//     const modifiers = {
//         plusHealth: random.range(0, 10),
//         healthRegen: random.range(0, 3),
//         resFire: random.range(0, 25),
//     };

//     return new Item({
//         itemCategory: itemCategoryRing,
//     });
// }

// function randomRuneWordStats() {

// }


// function randomRuneRuns() {
//     // [step] X runs
//     // [step] every run 1-5 runes
//     // [step] random rune
// }

// function bestEquipment() {

// }

// describe('', () => {

//     it('', () => {
//         const helmet = new Item({
//             itemCategory: itemCategoryHelmet,
//         });
//         const sword = new Item({
//             itemCategory: itemCategoryCrystalSword,
//             weaponSettings: {
//                 requiredStrength: 20,
//                 damage: [10, 15],
//             },
//             itemModifiers: {

//             },
//         });
//         const armor = new Item({
//             itemCategory: itemCategoryLeatherArmor,
//             armorSettings: {
//                 requiredStrength: 35,
//             },
//             itemModifiers: {
//                 resFire: 35,
//                 resIce: 35,
//             },
//         });
//         const ring = new Item({
//             itemCategory: itemCategoryRing,
//             itemModifiers: {
//                 plusHealth: 10,
//                 magicFind: 25,
//             },
//         });
//         const chippedRuby = new Item({
//             itemCategory: itemCategoryGems.ruby,
//             gemSettings: {
//                 quality: GemQuality.Chipped,
//             },
//         });
//         const runeEl = new Item({
//             itemCategory: itemCategoryRunes.el,
//         });
//         const runeTir = new Item({
//             itemCategory: itemCategoryRunes.tir,
//         });
//         const runeSol = new Item({
//             itemCategory: itemCategoryRunes.sol,
//         });

//         armor.putIntoSockets([runeEl, runeTir, runeSol]);
//     });

// });

// const runes = ['el', 'eth', 'ith', 'ral', 'ko', 'lem', 'ist', 'ber', 'ohm', 'zod'];

// function dist<T extends string>(values: T[]): {} {
//     const res: {[K: string]: number} = {};

//     for (let i = 0; i < values.length; ++i) {
//         if (res[values[i]] === undefined) res[values[i]] = 0;
//         res[values[i]] += 1;
//     }

//     const arr: [string, number, number][] = [];
//     for (const key in res) {
//         arr.push([key, res[key], res[key] / values.length]);
//     }

//     return arr.sort((a, b) => b[1] - a[1]);
// }

// const randomRunes = new Array(1000).fill(undefined).map(() => {
//     return random.sampleNormal(runes);
// });

// return dist(randomRunes);