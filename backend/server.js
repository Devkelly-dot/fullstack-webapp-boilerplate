const { connect, mongoose } = require('./db');
let app = require('./index');
const port = process.env.PORT || 8000;

connect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});