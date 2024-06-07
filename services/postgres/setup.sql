-- Database schema: https://lucid.app/lucidchart/72865ec2-e302-43c9-828b-27426595a02a/edit?invitationId=inv_f4be9ce7-aae7-470f-9af1-3a6f7f96cf15&page=0_0#

/**
Table: app_user
Table for all app users
*/
CREATE TAsBLE app_user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

/**
Table: exercise_type
Stores exercise types to specify what kind of attributes an exercise has
*/
CREATE TABLE exercise_type (
    exercise_type_id SERIAL PRIMARY KEY,
    exercise_id  INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    has_reps BOOLEAN DEFAULT FALSE,
    has_series BOOLEAN DEFAULT FALSE,
    has_weights BOOLEAN DEFAULT FALSE,
    has_time BOOLEAN DEFAULT FALSE,
    is_break BOOLEAN DEFAULT FALSE
);

/**
Table: exercise
Stores all exercises that users can add to their workouts
*/
CREATE TABLE exercise (
    exercise_id SERIAL PRIMARY KEY,
    exercise_type_id INT NOT NULL REFERENCES exercise_type(exercise_type_id),
    name varchar(255) NOT NULL,
    description TEXT
);

/**
Table: body_part
Stores body parts to specify what body parts an exercise targets
*/
CREATE TABLE body_part (
    body_part_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

/**
Table: exercises_body_parts
Many-to-many table to store which body parts an exercise targets
*/
CREATE TABLE exercises_body_parts (
    exercise_id INT NOT NULL REFERENCES exercise(exercise_id),
    body_part_id INT NOT NULL REFERENCES body_part(body_part_id),
    PRIMARY KEY (exercise_id, body_part_id)
);

/**
Table: workout_template
Stores workout templates that users can create
*/
CREATE TABLE workout_template (
    workout_id SERIAL PRIMARY KEY,
    author_id INT NOT NULL REFERENCES app_user(user_id),
    name varchar(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    private BOOLEAN DEFAULT FALSE
);

/**
Table: exercise_template_item
Stores exercises that are part of a workout template
*/
CREATE TABLE exercise_template_item (
    item_id SERIAL PRIMARY KEY,
    workout_template_id INT NOT NULL REFERENCES workout_template(workout_id),
    exercise_id  INT NOT NULL REFERENCES exercise(exercise_id),
    value JSONB NOT NULL,
    order_index INT NOT NULL
);

/**
Table: tag
Stores tags that can be added to workout templates
*/
CREATE TABLE tag (
    tag_id SERIAL PRIMARY KEY,
    name varchar(64)
);

/**
Table: workout_tags
Many-to-many table to store which tags are associated with a workout template
*/
CREATE TABLE workout_tags (
    workout_tag_id SERIAL PRIMARY KEY,
    tag_id INT NOT NULL REFERENCES tag(tag_id),
    workout_template_id INT NOT NULL REFERENCES workout_template(workout_id)
);

/**
Table: user_workout
Stores workouts that where downloaded by user from workout templates
*/
CREATE TABLE user_workout (
    user_workout_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES app_user(user_id),
    workout_id INT NOT NULL REFERENCES workout_template(workout_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

/**
Table: user_workout_log
Stores logs of user workouts. Log is generated after finishing a workout and contains all information about the training session
*/
CREATE TABLE user_workout_log (
    log_id SERIAL PRIMARY KEY,
    user_workout_id INT NOT NULL REFERENCES user_workout(user_workout_id),
    log_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

/**
Table: user_exercise_history_item
Stores history of user exercises. Each item is a single exercise that was done by user and contains all information about the exercise and progress that was made
*/
CREATE TABLE user_exercise_history_item (
    item_id SERIAL PRIMARY KEY,
    user_log_id INT NOT NULL REFERENCES user_workout_log(log_id),
    exercise_id  INT NOT NULL REFERENCES exercise(exercise_id),
    value JSONB NOT NULL,
    order_index INT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

