const app = require("./app");
require("./src/config/db");   // database connection

// 
app.listen(3000, () => {
  console.log("Server running on port 3000");
});


