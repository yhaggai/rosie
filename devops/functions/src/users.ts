import { auth, db, functions } from './firebase';

async function getNumberOfRegisteredUsers() {
  const listUsersResult = await auth.listUsers(1000);
  return listUsersResult.users.length;
}

export function updateTotalNumberOfUsers() {
  return functions.auth.user().onCreate(async () => {
    const totalUsers = await getNumberOfRegisteredUsers();
    const ref = db.ref(`users/registered`);
    return ref.set(totalUsers);
  });
}
