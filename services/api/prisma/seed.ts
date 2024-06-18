import seedUsers from './exampleSeedData/user.prisma';
import seedExercises from './exampleSeedData/exersice.prisma';
import seedWorkouts from './exampleSeedData/workout.prisma';

async function seed() {
  await seedUsers();
  await seedExercises();
  await seedWorkouts();

  console.log('Seeding completed ✅');
}

seed();
