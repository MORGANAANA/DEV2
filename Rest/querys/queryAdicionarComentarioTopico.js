/**
 * Created by mathias on 11/05/17.
 */
db.topico.update(   {_id:ObjectID("591451653ba3897c32b04dc9")},
    {$addToSet: {respostas: {
        "usuario": "usuario mathias",
        "resposta": "resposta mathias",
        "data": "data",
        "likes": 10000
    } } })