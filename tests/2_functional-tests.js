const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    // Test 1: Translation with text and locale fields
  test('Translation with text and locale fields: POST request to /api/translate', (done) => {
    const text = "Mangoes are my favorite fruit.";
    const locale = "american-to-british";

    chai
      .request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'text');
        assert.property(res.body, 'translation');

        assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        done();
      });
  });

    // Test 2: Translation with text and invalid locale field
  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    const text = "Translate this text.";
    const locale = "invalid-locale";

    chai
      .request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });

    // Test 3: Translation with missing text field
  test('Translation with missing text field: POST request to /api/translate', (done) => {
    const locale = "american-to-british";

    chai
      .request(server)
      .post('/api/translate')
      .send({ locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  // Test 4: Translation with missing locale field
  test('Translation with missing locale field: POST request to /api/translate', (done) => {
    const text = "Translate this text.";

    chai
      .request(server)
      .post('/api/translate')
      .send({ text })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });


  // Test 5: Translation with empty text
  test('Translation with empty text: POST request to /api/translate', (done) => {
    const text = "";
    const locale = "american-to-british";

    chai
      .request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });

  // Test 6: Translation with text that needs no translation
  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    const text = "The weather is nice today.";
    const locale = "american-to-british";

    chai
      .request(server)
      .post('/api/translate')
      .send({ text, locale })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'text');
        assert.property(res.body, 'translation');
        assert.equal(res.body.text, text);
        assert.equal(res.body.translation, 'Everything looks good to me!'); // No translation needed
        
        done();
      });
  });


});
