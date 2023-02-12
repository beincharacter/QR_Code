const express = require('express');
const path = require('path');
const qrcode = require('qrcode');
const app = express();
const PORT = process.env.PORT || 5152;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname +'/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname) + '/views');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/scan', (req, res, next) => {
    const inputText = req.body.text;
    console.log(inputText);
    qrcode.toDataURL(inputText, (err, src) => {
        console.log(src)
        res.render('scan.ejs', {
            qr_code: src,
        })
    })
})
app.listen(PORT, () => console.log(`listening to port ${PORT}`))