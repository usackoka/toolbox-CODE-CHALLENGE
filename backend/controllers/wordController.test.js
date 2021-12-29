import request from 'supertest'
import chai from 'chai'

const expect = chai.expect

describe('GET /iecho', function () {
  it('Regresa el espejo de una palabra y su palíndromo', async function () {
    const response = await request('http://localhost:3100').get('/iecho?text=test')

    expect(response.status).to.eql(200)
    expect(response.body.text).to.eql('tset')
  })
})
