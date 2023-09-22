const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {

    test('Translate "Mangoes are my favorite fruit." to British English', () => {
        const translator = new Translator();
        const input = "Mangoes are my favorite fruit.";
        const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
        //console.log(translator.ame2brits(input))
        assert.equal(translator.ame2brits(input), expected);
    });

    test('Translate "I ate yogurt for breakfast." to British English', () => {
        const translator = new Translator();
        const input = "I ate yogurt for breakfast.";
        const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
        //console.log(translator.ame2brits(input))
        assert.equal(translator.ame2brits(input), expected);
    });

    test('Translate "We had a party at my friend\'s condo." to British English', () => {
        const translator = new Translator();
        const input = "We had a party at my friend\'s condo.";
        const expected = 'We had a party at my friend\'s <span class="highlight">flat</span>.';
        //console.log(translator.ame2brits(input))
        assert.equal(translator.ame2brits(input), expected);
    });

});
