import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

// import our main App component
import App from '../../containers/App';

// import the manifest generated with the create-react-app build
import manifest from '../../../build/asset-manifest.json';
// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);


const path = require("path");
const fs = require("fs");

const replaceMetaTags = html => {
    const DEFAULTS = {
        __TITLE__: '',
        __META_TITLE__: '',
        __META_DESCRIPTION__: '',
        __OG_URL__: '',
        __OG_TYPE__: 'website',
        __OG_TITLE__: '',
        __OG_DESCRIPTION__: '',
        __OG_IMAGE__: '',
        __TWITTER_IMAGE__: '',
        __TWITTER_TITLE__: '',
        __TWITTER_DESCRIPTION__: '',
        __TWITTER_CARD__: 'summary_large_image',
        __TWITTER_SITE__: '',
        __TWITTER_URL__: '',
        __TWITTER_CREATOR__: '',
    };
    let data = {};
    data = _.defaultsDeep(data, DEFAULTS);
    for (let key of Object.keys(data)) {
        html = html.replace(new RegExp(key, 'g'), data[key]);
    }
    return html;
};

export default (store) => (req, res, next) => {
    // get the html file created with the create-react-app build
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const modules = [];
        const routerContext = {};

        // render the app as a string
        const html = ReactDOMServer.renderToString(
            
                <ReduxProvider store={store}>
                    <StaticRouter location={req.baseUrl} context={routerContext}>
                        <App/>
                    </StaticRouter>
                </ReduxProvider>
            
        );

        // get the stringified state
        const reduxState = JSON.stringify(store.getState());

        // map required assets to script tags
        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);

        // get HTML headers
        const helmet = Helmet.renderStatic();
        
        htmlData = replaceMetaTags(htmlData);
        
        res.type('text/html');
        // now inject the rendered app into our html and send it to the client
        return res.send(
            htmlData
                // write the React app
                .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                // write the string version of our state
                .replace('__REDUX_STATE__={}', `REDUX_STATE=${reduxState}`)
                // append the extra js assets
                .replace('</body>', extraChunks.join('') + '</body>')
                // write the HTML header tags
                .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
        );
    });
}