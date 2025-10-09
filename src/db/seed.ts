import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { users } from './schema';
import { db } from './db';
  
async function main() {
  const user: typeof users.$inferInsert = {
    name: 'Charles',
    email: 'charles@example.com',
    hashedPassword: 'hashed_password',
  };

  await db.insert(users).values(user);
  console.log('New user created!')

  const usersList = await db.select().from(users);
  console.log('Getting all users from the database: ', usersList)

  await db
    .update(users)
    .set({
      name: 'Charles v2',
      email: 'charles.updated@example.com',
    })
    .where(eq(users.email, user.email));
  console.log('User info updated!')

  await db.delete(users).where(eq(users.email, user.email));
  console.log('User deleted!')
}

main();