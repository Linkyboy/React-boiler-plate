import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Template from '../front-end/template.jsx';
import App from '../front-end/app.jsx';

export default function ServerRenderer() {
    return (req, res, next) => {


        if(req.method=='POST'){
            switch(req.url){

            }

        }
        else if(req.method=='GET'){
            const context = {};
    		const markup = ReactDOMServer.renderToString(

    			<StaticRouter location={ req.url } context={ context }>
    				   <App />
    			</StaticRouter>
    		);
            const helmet = Helmet.renderStatic();
            res.status(200).send(Template({
    			markup: markup,
                helmet: helmet
    		}));
        }


	};
}
