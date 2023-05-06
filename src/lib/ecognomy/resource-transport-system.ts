// import { DataDef } from './ecognomy';
// import {IStorageBooking, IStorageExchange, Storage} from './storage';
// import {ITransactionActions, ITransactionSystemCreate, TransactionSystem} from './transaction-system';

// // delivery men are dispatched to withdraw from and deposit to target storage fields

// // finds_storages_again_if_new_storage_was_added
// // finds_storages_again_if_nearby_storage_changed_stored_amount
// // finds_storages_again_if_nearby_storage_changed_booked_amount
// // finds_storages_again_if_nearby_storage_changed_booked_space
// // finds_storages_again_if_some_of_current_storages_is_deleted
// // finds_storages_again_if_current_path_changed
// // finds_storages_again_if_navmesh_changed_making_other_storages_closer
// // deposits_resources_to_obtain_to_closest_storage_if_storage_owner_removed
// // deposits_resources_to_obtain_to_closest_storage_if_storage_owner_decreased_number_of_delivery_men

// // requires_available_delivery_men_to_dispatch
// // requires_resources_to_obtain_or_dispose_to_dispatch
// // dispatches_no_more_workers_than_hired
// // dispatching_updates_resources_to_dispose_fully
// // dispatching_updates_resources_to_dispose_in_portion
// // dispatching_updates_resources_to_obtain_fully
// // dispatching_updates_resources_to_obtain_in_portion
// // dispatches_delivery_man_to_obtain_single_resource
// // dispatches_delivery_man_to_obtain_multiple_resource
// // dispatches_delivery_man_to_dispose_single_resource
// // dispatches_delivery_man_to_dispose_multiple_resource
// // dispatches_delivery_man_to_obtain_and_dispose_multiple_resource
// // dispatches_multiple_delivery_men_if_resources_size_is_greater_than_storage_capacity_of_single_delivery_man
// // updates_dispatched_man_delivery_config_if_there_are_new_resources_to_obtain
// // waits_with_dispatching_until_there_are_resources_to_obtain
// // waits_with_dispatching_until_there_are_resources_to_dispose
// // waits_with_dispatching_until_there_are_delivery_men_available
// // changes_path_if_destination_storage_was_removed

// interface INavigation {
//     getPosition(storage: Storage): {};
//     setDestination(pos: {}): void;
// }

// class NavigationSystem implements INavigation {
//     getPosition(storage: Storage) {
//         return {};
//     }

//     setDestination(pos: {}) {

//     }
// }

// export interface IResourceTransportSystemDeliveryMen {
//     dispatchDeliveryMan(body: DispatchDeliveryManBody): DeliveryMan;
// }

// type DispatchDeliveryManBody = {

// }

// class ResourceTransportSystem implements IResourceTransportSystemDeliveryMen {
//     constructor(readonly navigationSystem: NavigationSystem) {

//     }

//     dispatchDeliveryMan(body: DispatchDeliveryManBody) {
//         const dm = new DeliveryMan({

//         });
//         dm.setup();

//         return dm;
//     }
// }

// interface DeliveryManOperation {
//     readonly target: IStorageExchange & IStorageBooking;
//     readonly withdraw: Map<DataDef.Resource, number>;
//     readonly deposit: Map<DataDef.Resource, number>;
// }

// type DeliveryManCtorBody = {
//     readonly navigationSystem: INavigation;
//     readonly transactionSystem: ITransactionSystemCreate;
//     readonly storage: IStorageExchange & IStorageBooking;
// }

// export class DeliveryMan {
//     readonly navigationSystem: INavigation;
//     readonly transactionSystem: ITransactionSystemCreate;

//     readonly storage: IStorageExchange & IStorageBooking;

//     readonly finishedOperations: (DeliveryManOperation & {date: number})[] = [];
//     readonly pendingOperations: DeliveryManOperation[] = [];
//     readonly pendingTransactions = new Map<DeliveryManOperation, ITransactionActions>();

//     constructor(body: DeliveryManCtorBody) {
//         this.navigationSystem = body.navigationSystem;
//         this.transactionSystem = body.transactionSystem;
//         this.storage = body.storage;
//     }

//     setup() {
//         for (const op of this.pendingOperations) {
//             var ta = this.transactionSystem.create({
//                 from: this.storage,
//                 to: op.target,
//                 withdraw: op.withdraw,
//                 deposit: op.deposit,
//             });
//             this.pendingTransactions.set(op, ta);
//         }

//         const nextOp = this.pendingOperations[0];

//         this.navigationSystem.setDestination(this.navigationSystem.getPosition(nextOp.target));
//     }

//     onArrived() {
//         const currentOp = this.pendingOperations[0];
//         const ta = this.pendingTransactions.get(currentOp);

//         if (!ta) {
//             throw new Error();
//         }
//         else {
//             ta.commit();

//             this.pendingTransactions.delete(currentOp);

//             if (this.pendingOperations.length > 0) {
//                 const nextOp = this.pendingOperations[0];

//                 this.navigationSystem.setDestination(this.navigationSystem.getPosition(nextOp.target));
//             }
//         }
//     }
// }