const mongoose = require('mongoose');
const GoodsSchema = new mongoose.Schema({
  name:{ //商品名称
    type:String,
    default:""
  },
  category:{ //商品分类
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorys"
  },
  price:{ //商品价格
    type:Number,
    default:0
  },
  saleState:{ //商品折扣
    type:Boolean,
    default:false
  },
  salePrice:{ //折扣后的价格
    type:Number,
    default:0
  },
  count:{ //商品库存
    type:Number,
    default:0
  },
  sellType:{ //售卖类型 1:普通商品 , 2:热门商品, 3:最新上架
    type:String, 
    default:"1"
  },
  desc:{ //商品描述
    type:String,
    default:""
  }
})


module.exports = mongoose.model('Goods', GoodsSchema);