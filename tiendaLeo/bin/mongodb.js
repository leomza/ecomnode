var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect('mongodb://localhost/tiendaLeo',{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true},function(error){
    if(error){
        throw error;
    } else {
        console.log('Conexion a base de datos exitosa');
    }
});

mongoosePaginate.paginate.options = {
    lean: false,
    limit: 1
}

mongoose.mongoosePaginate=mongoosePaginate;
module.exports=mongoose;