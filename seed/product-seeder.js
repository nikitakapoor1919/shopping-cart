var mongoose = require('mongoose');

var Product = require('../models/product');

mongoose.connect('mongodb://localhost:27017/shop',{useNewUrlParser: true});

var products = [
  new Product({
    imagePath: 'http://4.bp.blogspot.com/-J7ojDNE5b3k/UwSlZQR2kdI/AAAAAAAAAAc/OABdF6I06YM/s1600/Project+IGI+1+-+Im+Going+In+full+version+pc+games+at+manojentertainment.png',
    title: 'Project I.G.I',
    description: 'Project I.G.I.: I\'m Going In (released in Europe as simply Project I.G.I.) is a tactical first-person shooter video game developed by Innerloop Studios and released on December 15, 2000 by Eidos Interactive. Upon release the game received mixed reviews due to a number of shortcomings, including poorly programmed A.I., lack of a mid-game save option, and the lack of multiplayer features. However it was praised for its superb sound design and graphics, thanks in part to its use of a proprietary game engine that was previously used in Innerloop\'s Joint Strike Fighter.',
    price: 189
  }),
  new Product({
    imagePath: 'http://vignette4.wikia.nocookie.net/marvel_dc/images/6/6c/Batman_Arkham_Knight_Cover_Art.jpg/revision/latest?cb=20140511102614',
    title: 'Batman: Arkham Knight',
    description: 'Batman: Arkham Knight is a 2015 action-adventure video game developed by Rocksteady Studios and published by Warner Bros. Interactive Entertainment for PlayStation 4, Xbox One, and Microsoft Windows. Based on the DC Comics superhero Batman, it is the successor to the 2013 video game Batman: Arkham Origins, and the fourth main installment in the Batman: Arkham series. Arkham Knight was released worldwide on June 23, 2015.',
    price: 430
  })
]

var kill = 0
for(var i=0; i < products.length; i++){
  products[i].save(function(error, result){
    kill++;
    if(kill === products.length){
        exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}