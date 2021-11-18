import { indexMessageToElastic } from './chat';
import { updateTotalNumberOfUsers } from './users';

exports.indexMessageToElastic = indexMessageToElastic();
exports.updateTotalNumberOfUsers = updateTotalNumberOfUsers();
