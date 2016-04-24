var mongoose = require('mongoose');

var ProduitsCycSchema = new mongoose.Schema({
  nom: String,
  image: String,
  prix: Number,
  cyclisme: { type: mongoose.Schema.Types.ObjectId, ref: 'Cyclisme' }
});

mongoose.model('Produit', ProduitsCycSchema);