const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const {InitialCheck} = require('../utils/checkDup.utils.js');

const storage = multer.diskStorage({
    destination: function ( req,file, cb){
        cb(null, '../uploads');
    },
    filename: function (req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});
// Define the deduplicate route
router.post('/deduplicate', upload.array('files[]'), (req, res) => {
   
    InitialCheck(req.files, res);
    

});

module.exports = router; 