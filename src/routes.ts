import express from "express"
import knex from './database/connection'

const routes = express.Router()

routes.get("/items", async (req, res) => {
  const items = await knex('items').select('*')

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3000/uploads/${item.image}`,
    }
  })

  return res.json(serializedItems)
})

routes.post('/points', async (req, res) => {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body

    const ids = await knex('points').insert({
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    })

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: ids[0]
      }
    })

    await knex('point_items').insert(pointItems)

    return res.json({ success: true })
})

export default routes
