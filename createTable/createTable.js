const db = require("../config/mysql");

// Check if favorites table not exists so crate it otherwise not
db.query("SHOW TABLES LIKE 'favorites'", (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
        const createFavorite = `
            CREATE TABLE favorites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                year VARCHAR(10) NOT NULL,
                type VARCHAR(50) NOT NULL,
                poster VARCHAR(255) NOT NULL
            );
        `;
        // Creation query
        db.query(createFavorite, (err, result) => {
            if (err) throw err;
            console.log("Table 'favorites' created successfully.");
        });
    }
});
