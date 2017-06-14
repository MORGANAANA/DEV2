db.simulado.aggregate([
    { $limit : 3},
    { $group: { _id: "$usuario", nAcertoTotais: { $sum: "$nAcerto" }, nQuestoesTotais: {$sum: "$nQuestoes"}, totalSimulados: {$sum: 1} }}
    ])