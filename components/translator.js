const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')


class Translator {
    ame2brits(input) {
        let fullText = input
        
        for (let x in americanOnly) {
            const value = makeTranslation( fullText, x, americanOnly[x])
            if(value){
                //console.log( value )
                return value
            }
        }
        for (let x in americanToBritishSpelling) {
            const value = makeTranslation( fullText, x, americanToBritishSpelling[x])
            if(value){
                //console.log( value )
                return value
            }
        }
        for (let x in americanToBritishTitles) {
            const value = makeTranslation( fullText, x, americanToBritishTitles[x])
            if(value){
                //console.log( value )
                return value
            }
        }
    };
}



function makeTranslation(text, keyword, value){
    
    // Step 2: Build regex pattern as a string
    const regexPattern = new RegExp(`[^a-zA-Z]${keyword}[^a-zA-Z]`, 'i');
    //let search1 = -1
    
    if( text.search(regexPattern) != -1) {
        //search1 = text.search(regexPattern)
        return text.replace(new RegExp(`${keyword}`, 'i'), `<span class="highlight">${value}</span>`)
    }

    const regexPattern2 = new RegExp(`${keyword}[^a-zA-Z]`, 'i');
    //let search2 = -1
    if( text.search(regexPattern2) != -1){
        //search2 = text.search(regexPattern2);
        return text.replace(new RegExp(`${keyword}`, 'i'), `<span class="highlight">${value}</span>`)
    }

    const regexPattern3 = new RegExp(`[^a-zA-Z]${keyword}`, 'i');
    //let search3 = -1
    if( text.search(regexPattern3) != -1){
        const sliceBefore = text.slice(0, text.search(regexPattern3) )
        const match = text.match( regexPattern3) 
        // console.log('len '+ sliceBefore.length)
        // console.log('len '+ match[0])
        if( (sliceBefore.length +  match[0].length) == text.length ){
            return text.replace(new RegExp(`${keyword}`, 'i'), `<span class="highlight">${value}</span>`)
        }
    }


    const regexPattern4 = new RegExp(`${keyword}`, 'i');
    //let search4 = -1
    if( text.search(regexPattern4) != -1){
        const sliceBefore = text.slice(0, text.search(regexPattern4) )
        const match = text.match( regexPattern4)
        
        if( (sliceBefore.length +  match[0].length) == text.length ){
            //search4 = text.search(regexPattern4);
            return text.replace(regexPattern4, `<span class="highlight">${value}</span>`)
        }
    }


    /*
    if(search1 != -1 || search2 != -1 || search3 != -1 || search4 != -1){
    console.log('1 '+ search1 ); // Output: [ 'apple' ]
    console.log('2 '+ search2 );
    console.log('3 '+ search3 );
    console.log('4 '+ search4 );
    console.log('str '+ str );
    }
    */
}

module.exports = Translator;