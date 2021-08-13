const db = require('../../models')
const sequelize = require('sequelize')

async function getStipends(){
  const data = await db.offers.findAll({
    attributes: ['stipend', [sequelize.fn('count', sequelize.col('stipend')), 'cnt']],
    group: ['stipend'],
    raw: true
  })
  
  console.log(data)
  return data
}

module.exports = { getStipends }


