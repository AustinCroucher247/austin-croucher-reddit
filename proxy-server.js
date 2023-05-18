// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();

// app.use(cors());

// app.get('/preview', async (req, res) => {
//     try {
//         const { url } = req.query;
//         const response = await axios.get(url, {
//             responseType: 'arraybuffer',
//         });
//         const contentType = response.headers['content-type'];
//         res.set('Content-Type', contentType);
//         res.send(response.data);
//     } catch (error) {
//         console.error(error);
//         res.sendStatus(500);
//     }
// });

// const port = 3001; // Set the desired port for your proxy server
// app.listen(port, () => {
//     console.log(`Proxy server is running on port ${port}`);
// });