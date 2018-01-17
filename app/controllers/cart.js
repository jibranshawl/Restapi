var mongoose = require('mongoose');
var express = require('express');


var productModel = mongoose.model('Product')
var cartModel  = mongoose.model('Cart')
var responseGenerator = require('./../../libs/responseGenerator');


module.exports.controllerFunction = function(app) {

	app.post('/cart/add',function(req, res) {

		 if(req.body.productName!=undefined && req.body.productId!=undefined ){

			var newcart = new cartModel({

				productName 		: req.body.productName,
				productId 	    	: req.body.productId
				
			}); // end newcart


	// now lets save the file 
		newcart.save(function(err){
			if(err){
				 var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                   res.send(myResponse);
   
			}
			else{
				 var myResponse = responseGenerator.generate(false,"successfully added to cart",200,newcart);
                    res.send(myResponse);
   		}

		}); // end cart save

	  
		}
		 else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            res.send(myResponse);

       
		 }

});



// start the route to delete a product from cart 
app.post('/cart/:productId/delete',function(req, res) {

	cartModel.remove({'_productId':req.params.productId},function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}


	}); 
  
});


  
}
