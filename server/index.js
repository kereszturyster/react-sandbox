import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import Home from '../src/containers/Home/Home';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', {
    index: false
}));

app.get('/*', (req, res) => {
    Home.getInitialProps().then((props) => {
        console.log(props);
        const home = ReactDOMServer.renderToString(<Home {...props} />);
        const indexFile = path.resolve('./build/index.html');

        fs.readFile(indexFile, 'utf8', (err, data) => {
            if (err) {
                console.error('Something went wrong:', err);
                return res.status(500).send('Oops, better luck next time!');
            }
            return res.send(
                data.replace('<div id="root"></div>', '<div id="root">'+home+'</div>')
            );
        });
    });
});

app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
});