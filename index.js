const app = require("./app");
require("./src/config/db");   // database connection

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});