// inside /api/apiRoutes.js <- this can be place anywhere and called anything
const express = require('express');

// if the other routers are not nested inside /api then the paths would change
const postsRoutes = require('./posts/postsRoutes');
// const productRoutes = require('./products/productRoutes');
// const clientRoutes = require('./clients/clientRoutes');

const router = express.Router(); // notice the Uppercase R

// this file will only be used when the route begins with "/api"
// so we can remove that from the URLs, so "/api/posts" becomes simply "/posts"

router.use('/posts', postsRoutes);
// router.use('/products', productRoutes);
// router.use('/clients', clientRoutes);

// .. and any other endpoint related to the users resource

// after the route has been fully configured, then we export it so it can be required where needed
module.exports = router; // it is recommended that this be the last line on the file