var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var DBurl = "mongodb://127.0.0.1:27017/";
var DBname = "coba";

let dbo = null;
MongoClient.connect(DBurl, (error, db) => {
    if (error) throw error;
    dbo = db.db(DBname);
});

app.get('/siswa', (request, response) => {
    dbo.collection("siswa").find().toArray((err, res) => {
        if(err) throw err;
        response.json(res);
    })
});

app.use(bodyParser.urlencoded({extended: false}))

app.post('/siswa', (request, response) => {
    let namaSiswa = request.body.name;
    let alamatSiswa = request.body.address;
    dbo.collection("siswa").insertOne({
        name : namaSiswa,
        address : alamatSiswa
    }, (err, res)=> {
        if(!err){
            response.json(res);
            response.end("data berhasil masuk");
        } else {
            throw err;
        }
    });
});

app.delete('/siswa/:id', (request, response) => {
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("siswa").deleteOne({
        _id : id_object
    }, (err, res) => {
        if(err) throw err;
        response.end("data berhasil dihapus");
    })
})


app.put('/siswa/:id', (req, response) => {
    let id = req.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = req.body.name;
    let alamatSiswa = req.body.address;
    dbo.collection("siswa").updateOne ({
        _id : id_object
    }, {$set: {
        name : namaSiswa,
        address : alamatSiswa
    }}, (err, res)=> {
        if(err) throw err;
        response.end("Data berhasil diupdate")
    });
});


app.get('/', function(req, res) {
    res.send("Hallo Rakha");
});



app.listen(3000);
console.log('Success run on port 3000');