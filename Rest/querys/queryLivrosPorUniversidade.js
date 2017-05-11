// listagem de livros por universidades
db.questao.aggregate([
    {$match: {universidade: {'$regex' : '^fuvest$', '$options' : 'i'} }},
    {$group: {_id : "$livro", qtdd_Questoes: { $sum: 1 }}} 
    ]
);

// nova versão

db.questao.aggregate([
        {$match: {universidade: {'$regex' : '^fuvest$', '$options' : 'i'} }},
        {$group: {_id : "$livro"}},
        {$lookup:
            {
                from: "livro",
                localField: "_id",
                foreignField: "titulo",
                as: "dados"
            }
        },
        { "$project":
            {
                "_id": 1,
                "dados": { "$arrayElemAt": [ "$dados", 0 ] }
            }
        }

    ]
);