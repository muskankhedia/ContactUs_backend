var app=require('express')(),
    port  = process.env.PORT || 3000,
    url = '0.0.0.0';       
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "muskan.khedia2000@gmail.com",
        pass: "poiuytmnbv"
    }
});

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.post('/send',function(req,res){
    console.log("got request")
    var mailOptions={
        to : 'sagartrading.khedia@gmail.com',
        subject: req.body.subject,
        text : req.body.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            throw(error);
     }else{
            console.log("Message sent: " + response.message);
            res.send("sent");
        }
});
});

const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
})
    