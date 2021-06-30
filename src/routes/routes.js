const express = require('express');
const router = express.Router();
const connection = require('../database/db.js');

router.get('/get/', (req, res) => {
    const sql = 'SELECT * FROM areas';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        }
    });
});

router.post('/add/area', (req, res) => {
    const sql = 'INSERT INTO areas SET ?';
    let dataObj = {
        Name : req.body.Name,
        Width : req.body.Width,
        Height : req.body.Height
    };
    connection.query(sql, dataObj, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/add/rect', (req, res) => {
    const sql = `INSERT INTO rectangles SET ?`;
    let dataObj = {
        Area_ID : req.body.Area_ID,
        PositionX : req.body.PositionX,
        PositionY : req.body.PositionY,
        Width : req.body.Width,
        Height : req.body.Height,
        Color : req.body.Color
    };
    connection.query(sql, dataObj, err => {
        if (err) throw err;
        res.send('Dato Insertado Correctamente');
    });
});

module.exports = router;