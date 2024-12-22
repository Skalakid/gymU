from src.patterns.singleton import SingletonMeta
from src.services.database import PrismaClient
from typing import List
from collections import defaultdict

import json

def recommend_linear_progress(value, target):
    if target == "":
        return value

    delta = 0

    if target == "weight":
        delta = 5
    elif target == "reps":
        delta = 1
    elif target == "time":
        delta = 30

    value[target] += delta
    return value


class ProgressService(metaclass=SingletonMeta):

    def __init__(self):
        self.client = PrismaClient()

    async def get_user_workout_id(self, user_id: int, workout_id: int):
        await self.client.connect()
        user_workout = await self.client.db.user_workout.find_first(
            where={"workout_id": workout_id, "user_id": user_id}
        )

        if user_workout is None:
            return None

        return user_workout.user_workout_id

    async def get_progress_targets(self, exercises: List[dict]):
        exercise_ids = list(set(map(lambda x: x["exercise_id"], exercises)))
        exercises_with_types = await self.client.db.exercise.find_many(
            where={"exercise_id": {"in": exercise_ids}}, include={"exercise_type": True}
        )

        exercise_type_mapper = dict()

        for exercise in exercises_with_types:
            exercise_type_mapper[exercise.exercise_id] = json.loads(
                exercise.exercise_type.progress_target
            )

        for exercise in exercises:
            exercise["target"] = exercise_type_mapper[exercise["exercise_id"]]

        return exercises

    def group_history_items_by_template_item_id(self, workouts_history_items):
        items_grouped_by_item_id = defaultdict(lambda: [])

        for history_items in workouts_history_items:
            for item in history_items:
                items_grouped_by_item_id[item.exercise_template_item_id].append(item)

        return items_grouped_by_item_id

    def get_last_exercises(self, template_exercises, workouts_history_items):
        items_grouped_by_item_id = self.group_history_items_by_template_item_id(
            workouts_history_items
        )

        result = []

        for exercise in template_exercises:
            item_id = exercise.item_id

            if item_id in items_grouped_by_item_id:
                item = items_grouped_by_item_id[item_id][0]
                value = item.value
                occurences = len(items_grouped_by_item_id[item_id])
            else:
                value = json.loads(exercise.value)
                occurences = 0

            result.append(
                {
                    "item_id": item_id,
                    "exercise_id": exercise.exercise_id,
                    "value": value,
                    "occurences": occurences,
                }
            )
        return result

    async def get_exercises(self, user_workout_id: int):
        user_workout = await self.client.db.user_workout.find_unique(
            where={"user_workout_id": user_workout_id}
        )

        workout_template = await self.client.db.workout_template.find_unique(
            where={"workout_id": user_workout.workout_id},
            include={"exercise_template_item": True},
        )

        user_workout_logs = await self.client.db.user_workout_log.find_many(
            where={"user_workout_id": user_workout_id},
            include={"user_exercise_history_item": True},
        )

        if len(user_workout_logs) == 0:
            return []

        template_exercises = workout_template.exercise_template_item
        template_exercises = sorted(template_exercises, key=lambda x: x.order_index)

        user_workout_logs = sorted(
            user_workout_logs, key=lambda x: x.log_date, reverse=True
        )
        workouts_history_items = map(
            lambda x: x.user_exercise_history_item, user_workout_logs
        )

        return self.get_last_exercises(template_exercises, workouts_history_items)

    async def recommend_progress(self, user_id: int, workout_id: int, func="linear"):
        await self.client.connect()

        user_workout_id = await self.get_user_workout_id(user_id, workout_id)

        if user_workout_id is None:
            return None

        exercises = await self.get_exercises(user_workout_id)
        exercises = await self.get_progress_targets(exercises)

        results = []
        for index, exercise in enumerate(exercises):
            value = recommend_linear_progress(
                exercise["value"],
                exercise["target"][0] if len(exercise["target"]) != 0 else "",
            )

            results.append(
                {
                    "exercise_id": exercise["exercise_id"],
                    "item_id": exercise["item_id"],
                    "value": value,
                    "order_index": index,
                }
            )

        return results
