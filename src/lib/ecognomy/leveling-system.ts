// // upgrade, downgrade, criteria, waiting period

// import { DataDef } from "./ecognomy";

// interface ILevel {
//     readonly criteria: ICriterion<any>[];
// }

// interface ILevelingData {

// }

// interface ICriterion<T> {
//     validate(val: T): boolean;
// }

// type LevelingSystemCtorBody = {

// }

// class LevelingSystem {
//     currentLevel: ILevel;

//     constructor(body: LevelingSystemCtorBody) {

//     }

//     meetsUpgradeCriteria() {

//     }

//     meetsDowngradeCriteria() {

//     }
// }

// //
// //
// //
// //
// //

// const res1 = new DataDef.Resource();
// const res2 = new DataDef.Resource();

// class LvlProperty_MinResidentsAmount<T extends number> implements ICriterion<T> {
//     constructor(readonly value: T) {

//     }

//     validate(val: T) {
//         return val >= this.value;
//     }
// }

// class LvlProperty_TimeElapsedSinceCriteriaMet_MinResidentsAmount<T extends number> implements ICriterion<T> {
//     constructor(readonly value: T) {

//     }

//     validate(val: T) {
//         return val >= this.value;
//     }
// }

// class LvlProperty_MinResourcesStored<T extends Map<DataDef.Resource, number>> implements ICriterion<T> {
//     constructor(readonly value: T) {

//     }

//     validate(val: T) {
//         // val.forEach((value, key) => {
//         //     const foundVal = this.value.get(key);
//         //     if (!foundVal)
//         //     if (value < foundVal)
//         // });
//         return false;
//     }
// }

// class LvlProperty_TimeElapsedSinceCriteriaMet_MinResourcesStored<T extends number> implements ICriterion<T> {
//     constructor(readonly value: T) {

//     }

//     validate(val: T) {
//         return val >= this.value;
//     }
// }

// class ResidenceLeveling implements ILevelingData {
//     residentsAmount = 0;
//     resourcesStored = new Map<DataDef.Resource, number>();

//     timeElapsedSinceCritMet_residentsAmount = 0;
//     timeElapsedSinceCritMet_resourcesStored = 0;
//     timeElapsedSinceCritUnmet_residentsAmount = 0;
//     timeElapsedSinceCritUnmet_resourcesStored = 0;

//     canDowngrade(info: { currentLevel: ILevel, previousLevel: ILevel, nextLevel: ILevel, data: ILevelingData }) {
//         for (const crit of info.currentLevel.criteria) {
//             if (crit instanceof LvlProperty_MinResidentsAmount) {
//                 crit.validate(this.residentsAmount);
//             }
//         }
//     }

//     canUpgrade() {

//     }
// }

// class ResidenceLevel implements ILevel {
//     readonly criteria: ICriterion<any>[];

//     constructor(body: { criteria: ICriterion<any>[] }) {
//         this.criteria = body.criteria
//     }
// }

// const residenceLvlSys = new LevelingSystem({
//     levels: [
//         new ResidenceLevel({
//             criteria: []
//         }),
//         new ResidenceLevel({
//             criteria: [
//                 new LvlProperty_MinResidentsAmount(4),
//                 new LvlProperty_MinResourcesStored(new Map([[res1, 100]])),
//             ]
//         }),
//         new ResidenceLevel({
//             criteria: [
//                 new LvlProperty_MinResidentsAmount(8),
//                 new LvlProperty_MinResourcesStored(new Map([[res1, 150], [res2, 125]])),
//             ]
//         }),
//     ],
//     preDowngradeCriteria: [
//         new LvlProperty_TimeElapsedSinceCriteriaUnmet_MinResidentsAmount(5),
//         new LvlProperty_TimeElapsedSinceCriteriaUnmet_MinResourcesStored(10),
//     ],
//     preUpgradeCriteria: [
//         new LvlProperty_TimeElapsedSinceCriteriaMet_MinResidentsAmount(15),
//         new LvlProperty_TimeElapsedSinceCriteriaMet_MinResourcesStored(20),
//     ],
//     initialLevel: levels => levels[0]
// });

// const residenceLeveling = new ResidenceLeveling();

// residenceLeveling.residentsAmount = 4;
// residenceLeveling.resourcesStored = new Map([[res1, 10], [res2, 20]]);
// residenceLeveling.timeElapsedSinceCritMet_residentsAmount = 15;
// residenceLeveling.timeElapsedSinceCritMet_resourcesStored = 20;
// residenceLeveling.canUpgrade(); // true