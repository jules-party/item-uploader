const fs = require('fs');
const express = require('express');
const upload = require('express-fileupload');
const app = express();

app.use(upload());
app.use(express.static(__dirname + '/www'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index.html');
});

var m = JSON.parse(fs.readFileSync('./www/imageinfo.json'));
app.post('/', (req, res) => {
    if (req.files) {
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

        file.mv('./www/uploads/' + r, function(err) {
            if (err) res.send(err);
            else res.send(`File '${filename}' successfully uploaded!`);
        });
    }
});

app.listen(5000);