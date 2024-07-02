import seedUsers from './exampleSeedData/user.prisma';
import seedExercises from './exampleSeedData/exersice.prisma';
import seedWorkouts from './exampleSeedData/workout.prisma';
import seedTags from './exampleSeedData/tag.prisma';

async function seed() {
  await seedUsers();
  await seedTags();
  await seedExercises();
  await seedWorkouts();

  console.log('Seeding completed ✅');
}

seed();
