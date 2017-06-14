db.simulado.aggregate([
    { $match: { usuario: "mathias" } },
    { $group: { _id: "$universidade", nAcerto: { $sum: "$nAcerto" }, nQuestoes: {$sum: "$nQuestoes"} } }
    ])