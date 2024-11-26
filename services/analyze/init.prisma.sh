#!/bin/bash

DATABASE_URL=postgresql://$( \
    cat ../secrets/postgres_user.txt
):$( \
    cat ../secrets/postgres_password.txt \
)@localhost:5432/$( \
    cat ../secrets/postgres_db.txt \
)

DATABASE_URL=$DATABASE_URL npx prisma db pull