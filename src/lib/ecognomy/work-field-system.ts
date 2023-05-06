// import { DataDef } from "./ecognomy"
// import { IStorageExchange } from "./storage";

// // dispatches workers for target resources (e.g. woodcutters for wood, farmers to harvest; clay, stone; gatherer, hunter)
// // workers go to known locations of res or roam looking for new ones

// // dispatches_workers_when_renewable_resource_finishes_growing
// // dispatches_workers_to_obtain_newly_found_grown_non_renewable_resource
// // dispatches_workers_to_obtain_newly_grown_non_renewable_resource
// // waits_for_group_of_renewable_resources_to_finish_growing_to_dispatch_workers
// // single_worker_withdraws_from_multiple_renewable_resources_of_the_same_type
// // assigns_newly_added_raw_resource
// // drops_newly_deleted_raw_resource
// // reassigns_nearby_resources_to_newly_added_work_field
// // if_no_free_workers_left_wait_for_worker_to_return_to_send_him_to_other_resources

// // questions:
// // how to handle single resources like carrots - gather individually or in groups/fields?

// // examples:
// // top-down with fields, animals

// // hunter: rabbit, game
// // gatherer: berries, honey, mushrooms
// // fisher: fish
// // fields: carrot, cabbage, wheat, corn
// // trees: apple, grape
// // locations: stone, clay, trees
// // egg, chicken, milk, beef, wool, honey

// // hunter lodge
// // farm lodge
// // stone miner, clay miner, woodcutter

// class WorkFieldSystem {
//     readonly workFields: WorkField[] = [];

//     addWorkField(workField: WorkField) {
//         this.workFields.push(workField);
//     }

//     update(deltaTime: number) {
//         for (const wf of this.workFields) {
//             wf.update(deltaTime);
//         }
//     }
// }

// type WorkFieldCtorBody = {
//     storage: IStorageExchange;
//     rawResources: DataDef.Resource[];
// }

// interface WorkField {
//     update(deltaTime: number): void;
// }

// class WorkField_Gatherer implements WorkField {}
// class WorkField_Cultivator implements WorkField {}

// //
// class WorkField_Extractor implements WorkField {}

// // worker skills:
// // hunting -
// // gathering

// interface Worker {

// }

// // gatherer states:
// // going to discovered location of raw res
// // roaming in search for undiscovered raw res (bushes, animal herds, fish ponds)
// // collecting raw res
// //   stationary | bushes - getting berries
// //   prey | animal herds - chasing (getting in range to shoot), shooting, getting carcass
// //   ? | fish ponds - throwing rod, waiting, getting fish
// // bringing raw res back to base
// class Worker_Gatherer implements Worker {}

// // extractor states:
// // going to unoccupied field containing raw res in radius
// // collecting raw res
// //   working
// //   changing location
// // bringing raw res back to base
// class Worker_Extractor implements Worker {}

// // cultivator states:
// // selecting action - tending to a type of raw res (tending fields, animals, orchards, beehives)
// // bringing raw res back to base
// class Worker_Cultivator implements Worker {}