const nock = require('nock');
const axios = require('axios');
const faker = require('faker');

const baseUrl = 'http://localhost:3000'

describe('Books controller', () => {
  const book = {
    title: faker.lorem.words(),
    isbn: faker.lorem.word(),
    resume: faker.lorem.text()
  }

  beforeEach(() => {
    nock(baseUrl).get('/books').reply(200, book)
  });

  test('#index', () => {
    axios.get(baseUrl)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(book);
      })
      .catch();
  })
});