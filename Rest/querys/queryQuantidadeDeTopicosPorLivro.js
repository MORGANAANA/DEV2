/**
 * Created by mathias on 04/05/17.
 */
db.topico.aggregate([
    {$group: {_id : "$livro", qtdd_Topicos: { $sum: 1 }}}
]);