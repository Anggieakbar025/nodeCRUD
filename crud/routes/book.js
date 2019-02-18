var siswa = require ("../models/book").siswa;

module.exports = function(app){
    app.get("/siswa", (req, res) => {
        siswa.find({}, (err, siswa) => {
            if(err)
                return res.send(err);

            res.json(siswa);
        });
    });

    app.get("/siswa/:id", (req, res) => {
        Book.find({"_id": req.params.id}, (err, siswa) => {
            if(err)
                return res.send(err);

            res.json(siswa);
        })
    });

}