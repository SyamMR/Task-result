var db=require('../config/connection')
var objectId=require('mongodb').ObjectID
module.exports={
    addProduct:(product)=>{
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection('product').find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('product').deleteOne({_id:objectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getProduct:(proId)=>{
        return new Promise((resolve,reject0)=>{
            db.get().collection('product').findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection('product').updateOne({ _id: objectId(proId) }, {
                $set: {
                    Name: proDetails.Name,
                    Description: proDetails.Description,
                    Prize: proDetails.Prize,
                    Catagory: proDetails.Catagory
                }
            }).then((response) => {
                resolve()
            })
        })
    }
}