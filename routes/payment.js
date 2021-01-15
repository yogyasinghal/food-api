var express = require('express');
var router = express.Router();
const port = process.env.PORT || 9000;
const checksum_lib = require('../paytm/checksum/checksum');

// var data;
console.log("in payment.js");
router.get('/', function(req, res) {
        // var sum = req.body.details.sum.toString();
    // var id = req.body.details.userId.toString();
    // data = req.body.details;
    var sum = 100;
    // console.log("req = ",req.body);
        let params = {}
        params['MID'] 					= 'ukpqpp34255639627842';
        params['WEBSITE']				= 'WEBSTAGING';
        params['CHANNEL_ID']			= 'WEB';
        params['INDUSTRY_TYPE_ID']	= 'Retail';
        params['ORDER_ID']			= 'ORD'+new Date().getTime();
        params['CUST_ID'] 			= "id";
        params['TXN_AMOUNT']		= "100";
        params['CALLBACK_URL']		= 'http://localhost:'+ port + '/success';
        params['EMAIL']				= 'yogyatest5@gmail.com';
        params['MOBILE_NO']			= '';

        checksum_lib.genchecksum(params,'DVxaoJ6olr@AbADR', function (err, checksum) {

            var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
            // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
            
            var form_fields = "";
            for(var x in params){
                form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
            }
            form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
            // res.send("res send");
            res.end();
    })
//   res.send("from payment.js");
  // res.render('index', { title: 'Express' });
});
// router.post('/',(req,res,next)=>{
//     var sum = req.body.details.sum.toString();
//     var id = req.body.details.userId.toString();
//     data = req.body.details;
//     console.log("req = ",req.body);

//     // localStorage.setItem('name',req.body.details.name);
//     // localStorage.setItem('address',req.body.details.address);
//     // localStorage.setItem('city',req.body.details.city);
//     // localStorage.setItem('state',req.body.details.state);
//     // localStorage.setItem('pincode',req.body.details.pincode);
//     // localStorage.setItem('country',req.body.details.country);



//     // console.log(typeof(req.body.details.sum));
// // module.exports = (router)=>{
//     // router.get('/',(req,res)=>{
//         let params = {}
//         params['MID'] 					= 'ukpqpp34255639627842';
//         params['WEBSITE']				= 'WEBSTAGING';
//         params['CHANNEL_ID']			= 'WEB';
//         params['INDUSTRY_TYPE_ID']	= 'Retail';
//         params['ORDER_ID']			= 'ORD'+new Date().getTime();
//         params['CUST_ID'] 			= id;
//         params['TXN_AMOUNT']		= sum;
//         params['CALLBACK_URL']		= 'http://localhost:'+ port + '/success';
//         params['EMAIL']				= 'yogyatest5@gmail.com';
//         params['MOBILE_NO']			= '';

//         checksum_lib.genchecksum(params,'DVxaoJ6olr@AbADR', function (err, checksum) {

//             var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
//             // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
            
//             var form_fields = "";
//             for(var x in params){
//                 form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
//             }
//             form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
//             // res.send("res send");
//             res.end();
//     })
//     // })
// })
// console.log("/////////////////////////////////////////");
// console.log("data = ",data);
// console.log("/////////////////////////////////////////");
module.exports = router;