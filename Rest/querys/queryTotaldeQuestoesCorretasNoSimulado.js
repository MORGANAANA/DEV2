db.simulado.aggregate([
    { $match: 'xxxx'},
    { $group: { _id: "$usuario", nAcertoTotais: { $sum: "$nAcerto" }, nQuestoesTotais: {$sum: "$nQuestoes"} }}
    ])