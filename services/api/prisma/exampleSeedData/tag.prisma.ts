import { prisma } from '../../src/config/db.server';
import { NewUser } from '../../src/types/user';

export default async function seedTags() {
  const tags = await prisma.tag.findMany();
  if (tags.length === 0) {
    await Promise.all(
        getExampleTags().map(async (tag) => {
            await prisma.tag.create({
                data: {
                    name: tag,
                },
            });
        })
    );
    console.log('Tags seeded');
  }
}

function getExampleTags() {
    return [
        'Arms',
        'Legs',
        'Back',
        'Chest',
        'Shoulders',
        'Core',
        'FBW',
        'Upper body',
        'Lower body',
        'Cardio',
        'Strength',
        'Endurance',
    ]
}