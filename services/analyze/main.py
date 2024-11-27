from dotenv import load_dotenv
from src.models.basket import basket

from prisma import Client
import asyncio
import os

load_dotenv()
async def main() -> None:
    client = Client()
    await client.connect()

    workouts = await client.workout_template.find_many(
        include={
            'exercise_template_item': True
        }
    )

    baskets = []

    products = set()
    for workout in workouts:
        exercise_ids = []
        for exercise in workout.exercise_template_item:
            exercise_ids.append(exercise.exercise_id)
            products.add(exercise_ids[-1])
        
        baskets.append(tuple(exercise_ids))
    
    basket_analysis = basket.BasketMarketAnalysis(
        baskets,
        list(products),
        0.0000001
    )

    print(basket_analysis.get_supports())

    await client.disconnect()

if __name__ == '__main__':
    print('why this shit doesn\'t work')
    print(os.getenv("DATABASE_URL"))
    # asyncio.run(main())
    asyncio.get_event_loop().run_until_complete(main())
