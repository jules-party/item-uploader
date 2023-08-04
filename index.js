const fs = require('fs');
const express = require('express');
const upload = require('express-fileupload');
const app = express();
const cheerio = require('cheerio');
const https = require('https');

app.use(upload());
app.use(express.static(__dirname + '/www', {
    extensions: ['html', 'htm']
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index.html');
});

app.get('/uploader', function(req, res) {
    res.send(__dirname + '/www/uploader.html');
})

app.get('/viewer', function(req, res) {
    res.send(__dirname + '/www/viewer.html');
});

app.post('/uploader', (req, res) => {
    if (req.files) {
        var m = JSON.parse(fs.readFileSync('./www/imageinfo.json'));
        var file = req.files.file;
        var filename = file.name;
        let r = (Math.random() + 1).toString(36).substring(8) + '.' + filename.split(".").pop(); 
        console.log(`File '${filename}' attempting to be uploaded from ${req.ip}'`); 

        var data =
        {
            name: req.body.nameinput,
            filename: r,
            price: req.body.priceinput,
            description: req.body.descriptioninput
        }

        m.images.push(data);
        fs.writeFileSync('./www/imageinfo.json', JSON.stringify(m));

        fs.readFile("./www/uploader.html", "utf-8", function (err, data) {
            if (err) throw err;
            var $ = cheerio.load(data);

            file.mv('./www/uploads/' + r, function (err) {
                if (err) res.send(err);
                else {$("#statustext").text("Uploaded!");res.send($.html());}
            });
        });
    }
});

app.listen(5000);