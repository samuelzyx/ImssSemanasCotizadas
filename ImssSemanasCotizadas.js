const REQUEST = require('request');
const TOUGH = require('tough-cookie');
const FS = require('fs');
const Cookie = TOUGH.Cookie;

const CURP = "SELS900317HDFDGM05"

//Client REQUEST
var formData = {
    "curp": CURP,
    "nss": "47079004181",
    "correo":"correo@correo.com",
    "captcha": "LbaCa"
};

console.log("///////////////////////");
console.log("Solicitando Llaves");
REQUEST.post({url:"https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/usuarios/LoginAsegurado",formData:formData},
function(err,httpResponse,body){
    var CookieZKi = Cookie.parse(httpResponse.headers['set-cookie'][0]);
    var CookieZNP = Cookie.parse(httpResponse.headers['set-cookie'][1]);
    var CookieProd443 = Cookie.parse(httpResponse.headers['set-cookie'][2]);

    CookieZKi = (""+CookieZKi).split(";")[0];
    CookieZNP = (""+CookieZNP).split(";")[0];
    CookieProd443 = (""+CookieProd443).split(";")[0];


    console.log("Llaves:");
    console.log("CookieZKi "+CookieZKi);
    console.log("CookieZNP "+CookieZNP);
    console.log("CookieProd443 "+CookieProd443);

    //Set the cookie instead of setting into header
    var cookie = REQUEST.cookie('0000JSkyyogpRHGuZKi=1htNGxxOAJa3KzbABA9ozuZ0yHjXcvyfz7X07-pP5FdLh6sNzYhf!xluE8OTlnl!hhds3mUJoL; ZNPCQ003-32343500=84d13631; _ga=GA1.3.1272471901.1557810370; _gid=GA1.3.1632703785.1557810370; __utma=37030712.1272471901.1557810370.1557810574.1557810574.1; __utmc=37030712; __utmz=37030712.1557810574.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; __utmb=37030712.1.10.1557810574');
    // var cookie = REQUEST.cookie('_ga=GA1.3.616537359.1557804068; _gid=GA1.3.1510430620.1557804068; __utma=37030712.616537359.1557804068.1557804068.1557804068.1; __utmc=37030712; __utmz=37030712.1557804068.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); '+CookieZNP+'; '+CookieProd443+'; '+CookieZKi+';');

    var headers = {
        'Cookie': cookie
    };

    // Configure the REQUEST
    var options = {
        headers:headers,
        url: "https://serviciosdigitales.imss.gob.mx/semanascotizadas-web/certificacion/vistaReporte"
    };

    console.log("///////////////////////");
    console.log("Solicitando PDF....")
    REQUEST.post(options,
        function(err,httpResponse,body){
            if(err){
                console.log(err);
                return;
            }
            var wstream = FS.createWriteStream("./PDF/"+CURP+".pdf");
            wstream.write(body);
            wstream.end();
            // FS.writeFile("./PDF/"+CURP+".pdf", httpResponse, 'binary', function(err) {
            //     if(err) {
            //         return console.log(err);
            //     }
            // });
            console.log("The file was saved!");
        });
    });
