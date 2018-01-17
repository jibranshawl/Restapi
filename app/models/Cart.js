
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var cartSchema = new Schema({

	productId			: {type:String,required:true},
	productName 		: {type:String,default:''}	
});


mongoose.model('Cart',cartSchema);