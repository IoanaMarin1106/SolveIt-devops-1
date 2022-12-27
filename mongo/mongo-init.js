db.createUser(
    {
        user: "eduard",
        pwd: "test",
        roles: [
            {
                role: "readWrite",
                db: "test-db"
            }
        ]
    }
);