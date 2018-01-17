
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({

	productId			: {type:String,required:true},
	productName			: {type:String,required:true},
	CompanyName			: {type:String,required:true},
	Rating				: {type:Number},
	price 	 			: {type:Number},
	reviews				: [], // because there are multiple comments 
	deliveryOption		: []	

});


mongoose.model('Product',productSchema);



