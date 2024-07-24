import app from './app';
import 'dotenv/config'
const port = process.env.PORT || 3000;
require('log-timestamp') (function() { return new Date().toLocaleString();
});
app.listen(port,() => {
    console.log(`Server started on http://localhost:${port}`);
});