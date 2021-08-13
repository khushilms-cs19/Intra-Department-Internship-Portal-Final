const db = require('../../models')
const sequelize = require('sequelize')

async function getFieldOfWork(){
  const data = await db.offers.findAll({
    attributes: ['field', [sequelize.fn('COUNT', sequelize.col('field')), 'cnt']],
    group: ['field'],
    raw: true
  })
  
  console.log(data)
  return data
}

module.exports = { getFieldOfWork }