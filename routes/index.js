var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('index',{products});
  })
});
router.get('/add-product',(req,res)=>{
  res.render('add-product')
})
router.post('/add-product',(req,res)=>{
  productHelpers.addProduct(req.body)
  res.redirect('/')
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/')
  })
})
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProduct(req.params.id)
  console.log(product)
  res.render('edit-product',{product})
})
router.post('/edit-product/:id', (req, res) => {
  console.log(req.params.id);
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    res.redirect('/')
  })
})
module.exports = router;
