CREATE TABLE app_user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE exercise (
    exercise_id SERIAL PRIMARY KEY,
    exercise_type_id INT NOT NULL REFERENCES exercise_type(exercise_type_id),
    name varchar(255) NOT NULL,
    description TEXT
);

CREATE TABLE body_part (
    body_part_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE exercises_body_parts (
    exercise_id INT NOT NULL REFERENCES exercise(exercise_id),
    body_part_id INT NOT NULL REFERENCES body_part(body_part_id),
    PRIMARY KEY (exercise_id, body_part_id)
);

CREATE TABLE workout_template (
    workout_id SERIAL PRIMARY KEY,
    author_id INT NOT NULL REFERENCES app_user(user_id),
    name varchar(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    private BOOLEAN DEFAULT FALSE
);

CREATE TABLE exercise_template_item (
    item_id SERIAL PRIMARY KEY,
    workout_template_id INT NOT NULL REFERENCES workout_template(workout_id),
    exercise_id  INT NOT NULL REFERENCES exercise(exercise_id),
    value JSONB NOT NULL,
    order_index INT NOT NULL
);

CREATE TABLE tag (
    tag_id SERIAL PRIMARY KEY,
    name varchar(64)
);

CREATE TABLE workout_tags (
    workout_tag_id SERIAL PRIMARY KEY,
    tag_id INT NOT NULL REFERENCES tag(tag_id),
    workout_template_id INT NOT NULL REFERENCES workout_template(workout_id)
);

CREATE TABLE user_workout (
    user_workout_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES app_user(user_id),
    workout_id INT NOT NULL REFERENCES workout_template(workout_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_workout_log (
    log_id SERIAL PRIMARY KEY,
    user_workout_id INT NOT NULL REFERENCES user_workout(user_workout_id),
    log_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_exercise_history_item (
    item_id SERIAL PRIMARY KEY,
    user_log_id INT NOT NULL REFERENCES user_workout_log(log_id),
    exercise_id  INT NOT NULL REFERENCES exercise(exercise_id),
    value JSONB NOT NULL,
    order_index INT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

