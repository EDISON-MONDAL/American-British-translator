'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body
      
      if(text == undefined || locale == undefined){
        return res.json({ error: 'Required field(s) missing' })
      }

      if(text == ''){
        return res.json({ error: 'No text to translate' })
      }

      if(locale !== "american-to-british" && locale !== "british-to-american"  ){
        return res.json({ error: 'Invalid value for locale field' })
      }

      if(locale == "american-to-british" ){
        const result = translator.ame2brits( text );

        if(text !== result){
          res.json({ text, translation: result })
        } else {
          res.json({ text, translation: "Everything looks good to me!" })
        }

      } else if( locale == "british-to-american" ){
        const result = translator.brits2ame( text );

        if(text !== result){
          res.json({ text, translation: result })
        } else {
          res.json({ text, translation: "Everything looks good to me!" })
        }

      }


    });
};
