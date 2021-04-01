const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());

    consign()
        .include('modules')
        .into(app);
    
    return app;

}