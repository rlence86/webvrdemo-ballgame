function requireAll (req) { req.keys().forEach(req); }
require("aframe-environment-component");
requireAll(require.context('./components/', true, /\.js$/));
requireAll(require.context('./primitives/', true, /\.js$/));