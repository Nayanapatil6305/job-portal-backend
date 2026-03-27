const app = require("./app");
require("./src/config/db");   // database connection

// 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


