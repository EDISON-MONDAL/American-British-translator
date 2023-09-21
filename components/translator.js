const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')


class Translator {
    ame2brits(input) {
        
        for (let x in americanOnly) {
            makeTranslation( input, x)
        }
        for (let x in americanToBritishSpelling) {
            makeTranslation( input, x)
        }
        for (let x in americanToBritishTitles) {
            makeTranslation( input, x)
        }
    };
}

function makeTranslation(text, keyword){
    
    // Step 2: Build regex pattern as a string
    const regexPattern = new RegExp(`[^a-zA-Z]${keyword}[^a-zA-Z]`, 'i');
    const search1 = text.search(regexPattern);

    const regexPattern2 = new RegExp(`${keyword}[^a-zA-Z]`, 'i');
    let search2 = -1
    if( text.search(regexPattern2) == 0){
        search2 = text.search(regexPattern2);
    }

    const regexPattern3 = new RegExp(`[^a-zA-Z]${keyword}`, 'i');
    let search3 = -1
    if( text.search(regexPattern3) != -1){
        const sliceBefore = text.slice(0, text.search(regexPattern3) )
        const match = text.match( regexPattern3) 
        // console.log('len '+ sliceBefore.length)
        // console.log('len '+ match[0])
        if( (sliceBefore.length +  match[0].length) == text.length ){
            search3 = text.search(regexPattern3);
        }
    }


    const regexPattern4 = new RegExp(`${keyword}`, 'i');
    let search4 = -1
    if( text.search(regexPattern4) == 0){
        const sliceBefore = text.slice(0, text.search(regexPattern4) )
        const match = text.match( regexPattern4)
        
        if( (sliceBefore.length +  match[0].length) == text.length ){
            search4 = text.search(regexPattern4);
        }
    }



    if(search1 != -1 || search2 != -1 || search3 != -1 || search4 != -1){
    console.log('1 '+ search1 ); // Output: [ 'apple' ]
    console.log('2 '+ search2 );
    console.log('3 '+ search3 );
    console.log('4 '+ search4 );
    }
}

module.exports = Translator;