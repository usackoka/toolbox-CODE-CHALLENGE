import request from 'supertest'
import chai from 'chai'

const expect = chai.expect

describe('GET /iecho', function () {
  it('Regresa el espejo de una palabra y su palíndromo', async function () {
    const response = await request('http://localhost:3100').get('/iecho?text=test')

    expect(response.status).to.eql(200)
    expect(response.body.text).to.eql('tset')
    expect(response.body.palindrome).to.eql(false)
  })
})

describe('GET /iecho', function () {
  it('Regresa el espejo de una palabra y su palíndromo', async function () {
    const response = await request('http://localhost:3100').get(
      '/iecho?text=reconocer'
    )

    expect(response.status).to.eql(200)
    expect(response.body.text).to.eql('reconocer')
    expect(response.body.palindrome).to.eql(true)
  })
})

describe('GET /iecho', function () {
  it('Regresa un mensaje de error', async function () {
    const response = await request('http://localhost:3100').get(
      '/iecho'
    )

    expect(response.status).to.eql(400)
    expect(response.body.error).to.eql('no text')
  })
})
