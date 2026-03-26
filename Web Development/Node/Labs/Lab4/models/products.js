const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    name: {
      type: String,
      minLength: 5,
      maxLength: 20,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    categories: {
      type: [String],
      default: ['General']
    }
  },
  {
    timestamps: true
  }
);

productsSchema.index({name: 1, owner: 1}, {unique: true});

productsSchema.virtual('status').get(function () {
  if (this.quantity > 2) {
    return 'available';
  } else if (this.quantity > 0) {
    return 'low stock';
  } else {
    return 'out of stock';
  }
});

productsSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, {__v, createdAt, updatedAt, id, ...rest}, options) => rest
});
productsSchema.set('toObject', {
  virtuals: true
});

productsSchema.pre(
  ['find', 'findOne', 'findOneAndUpdate'],
  async function autoPopulateOwner() {
    this.populate('owner', 'username -_id');
  }
);

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
