var mongoose = require('mongoose');

var CyclismeSchema = new mongoose.Schema({
  nom: String,
  produits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }]
});

mongoose.model('Cyclisme', CyclismeSchema);