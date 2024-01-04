var express = require('express');
var router = express.Router();

var bicicletas = [

];


/*
 * Retorna a lista de bicicletas
 */
router.get('/', function(req, res){
    res.json(bicicletas);
});


/*
 * Retorna uma bicicleta, dada o seu ID
 */
router.get('/:id([0-9]+)', function(req, res){
    var indice = pegaIndicebicicleta(req.params.id);

    if (indice == -1) {
        res.status(404);
        res.json({message: "Not Found"});
        return;
    }

    res.json(bicicletas[indice]);
});


/*
 * Insere uma bicicleta
 */
router.post('/', function(req, res){
    // if(!req.body.nome || !req.body.credito.toString().match(/^[0-9]+$/g)) {
    //     res.status(400);
    //     res.json({message: "Bad Request"});
    //     return;
    // }

    var newId = bicicletas.length+1;

    bicicletas.push({
        id: newId,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        status: req.body.status,
    });

    res.json({message: "A nova bicicleta foi criada.", location: "/bicicleta/" + newId});
});


/*
 * Atualiza os dados de um bicicleta
 */
router.put('/:id', function(req, res){
    // if(!req.body.nome || !req.body.credito.toString().match(/^[0-9]+$/g)){
    //     res.status(400);
    //     res.json({message: "Bad Request"});
    //     return;
    // }

    var indice = pegaIndiceBicicleta(req.params.id);

    if(indice == -1) {
        res.json({message: "Not found"});
        return;
    }

    var bicicletaSelecionada = bicicletas[indice];
    bicicletaSelecionada.marca = req.body.marca;
    bicicletaSelecionada.modelo = req.body.modelo;
    bicicletaSelecionada.ano = req.body.ano;
    bicicletaSelecionada.status = req.body.status;

    res.json({message: "Bicicleta ID " + req.params.id + " atualizada.",
        location: "/bicicleta/" + req.params.id});
});


/*
 * Remove uma bicicleta
 */
router.delete('/:id', function(req, res) {
    var indice = pegaIndiceBicicleta(req.params.id);

    if(indice == -1) {
        res.json({message: "Not found"});
        return;
    }

    bicicletas.splice(indice, 1);
    res.send({message: "Bicicleta ID " + req.params.id + " removido."});
});


/*
 * Retorna um bicicleta, dado o seu ID
 */
function pegaIndiceBicicleta(id) {
    var len = bicicletas.length;

    for (var i = 0; i < len; i++) {
        if (bicicletas[i].id == id) {
            return i;
        }
    }

    return -1;
}

module.exports = router;