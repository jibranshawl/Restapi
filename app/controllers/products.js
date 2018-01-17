var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userRouter  = express.Router();
var productModel = mongoose.model('Product')
var responseGenerator = require('./../../libs/responseGenerator');



module.exports.controllerFunction = function(app) {

// list all products
	userRouter.get('/products',function(req, res) {

			productModel.find(function(err,result){
				if(err){
					res.send(err)
				}
				else{
					res.send(result)
				}


			});// end user model find 
		  
		});

// end route to GET all products

// route to get a particular product
	userRouter.get('/products/:id',function(req, res) {

			productModel.findOne({'_id':req.params.id},function(err,result){
				if(err){
					console.log("some error");
					res.send(err);
				}
				else{
					//console.log(result);
					res.send(result)
				}


			});// end user model find 
		  
		});

// end route to get a particular product


// start route to Create a product

  userRouter.post('/products/create',function(req, res) {

	 if(req.body.productId!=undefined && req.body.productName!=undefined && req.body.companyName!=undefined && req.body.Rating!=undefined && req.body.price!=undefined  && req.body.reviews!=undefined  && req.body.deliveryOption!=undefined){

		var newproduct = new productModel({

			productId			: req.body.productId,
			productName 		: req.body.productName,
			companyName 		: req.body.companyName,
			Rating   			: req.body.Rating,
			price 	 			: req.body.price,
			reviews				: req.body.reviews,  
			deliveryOption		: req.body.deliveryOption

		}); // end newproduct 


	// now lets save the file 
		newproduct.save(function(err){
			if(err){
				 var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                   res.send(myResponse);
                   
			}
			else{
				 var myResponse = responseGenerator.generate(false,"successfully signup user",200,newUser);
                  res.send(myResponse);
               	}

		}); // end new product save

	  
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

});// end route to Create a products


// start route to edit a product using _id 

userRouter.put('/products/:id/edit',function(req, res) {

	var update = req.body;

	productModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}


	}); 
  
});
// end route to edit a product using _id


// start the route to delete a product 
userRouter.post('/products/:id/delete',function(req, res) {

	productModel.remove({'_id':req.params.id},function(err,result){

		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}


	}); 
  
});


    app.use('/amazon', userRouter);

}