const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

const buildPath = path.join(__dirname, '..', 'build');

app.use(compression());
app.use(express.static(buildPath));


app.get('/*', function(req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});