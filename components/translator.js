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
                
                fullText = value
            }
        }
        for (let x in americanToBritishSpelling) {
            const value = makeTranslation( fullText, x, americanToBritishSpelling[x])
            if(value){
                fullText = value
            }
        }
        for (let x in americanToBritishTitles) {
            const value = makeTranslation( fullText, x, americanToBritishTitles[x])
            if(value){
                fullText = value
            }
        }

        //console.log('<<<<<<< '+ fullText)
        return fullText
    };

    brits2ame(input) {
        let fullText = input
        
        for (let x in britishOnly) {
            const value = makeTranslation( fullText, x, britishOnly[x])
            if(value){
                
                fullText = value
            }
        }
        for (let x in americanToBritishSpelling) {
            const value = makeTranslation( fullText, americanToBritishSpelling[x], x)
            if(value){
                fullText = value
            }
        }
        for (let x in americanToBritishTitles) {
            const value = makeTranslation( fullText, americanToBritishTitles[x], x)
            if(value){
                fullText = value                
            }
        }

        
        return fullText
    };
}



function makeTranslation(text, keyword, value){
    
    // Step 2: Build regex pattern as a string
    const regexPattern = new RegExp(`[^a-zA-Z]${keyword}[^a-zA-Z]`, 'i');    
    if( text.search(regexPattern) != -1) {
        
        if( checkAlreadyReplacedWord(text, text.search(regexPattern)) == false){
            return text.replace(new RegExp(`${keyword}`, 'i'), `<span class="highlight">${ checkCapitalLetter( text, regexPattern, value) }</span>`)   
        }        
    }

    const regexPattern2 = new RegExp(`${keyword}[^a-zA-Z]`, 'i');    
    if( text.search(regexPattern2) != -1){
        
        if( checkAlreadyReplacedWord(text, text.search(regexPattern2)) == false){
            return text.replace(new RegExp(`${keyword}`, 'i'), `<span class="highlight">${ checkCapitalLetter( text, regexPattern2, value) }</span>`) 
        }  
    }


    const regexPattern3 = new RegExp(`[^a-zA-Z]${keyword}`, 'i');    
    if( text.search(regexPattern3) != -1){
        const sliceBefore = text.slice(0, text.search(regexPattern3) )
        const match = text.match( regexPattern3) 
        // console.log('len '+ sliceBefore.length)
        // console.log('len '+ match[0])
        if( (sliceBefore.length +  match[0].length) == text.length ){
            
            if( checkAlreadyReplacedWord(text, text.search(regexPattern3)) == false){
                return text.replace(new RegExp(`${keyword}`, 'i'), `<span class="highlight">${ checkCapitalLetter( text, regexPattern3, value) }</span>`)  
            }  

        }
    }


    const regexPattern4 = new RegExp(`${keyword}`, 'i');    
    if( text.search(regexPattern4) != -1){
        const sliceBefore = text.slice(0, text.search(regexPattern4) )
        const match = text.match( regexPattern4)
        
        if( (sliceBefore.length +  match[0].length) == text.length ){
            
            if( checkAlreadyReplacedWord(text, text.search(regexPattern4)) == false){
                return text.replace(new RegExp(`${keyword}`, 'i'), `<span class="highlight">${ checkCapitalLetter( text, regexPattern4, value) }</span>`)
            }   
        }
    }
    
}




function checkAlreadyReplacedWord(fullText, matchedWordPosition){
    let withinReplacedWordPosition = false

    const checkAllReplacedWordPosition = [];
    let searchStartingPosition = 0;

    while (fullText.indexOf('<span class="highlight">', searchStartingPosition) !== -1) {
        searchStartingPosition = fullText.indexOf('<span class="highlight">', searchStartingPosition);

                    
            searchStartingPosition += '<span class="highlight">'.length; // Move to the next character after the found substring

            const endingPositon = fullText.indexOf('</span>', searchStartingPosition)

            searchStartingPosition += '</span>'.length; // Move to the next character after the found substring

            checkAllReplacedWordPosition.push( [searchStartingPosition, endingPositon] );


            console.log('stat '+searchStartingPosition)

        
    }

    console.log('arr ' + checkAllReplacedWordPosition);
    console.log('searchStartingPosition ' + searchStartingPosition);
    console.log('matched word position ' + matchedWordPosition)

    if(checkAllReplacedWordPosition.length > 0){
        for(let i=0; i < checkAllReplacedWordPosition.length; i++){
            if( checkAllReplacedWordPosition[i][0] <= matchedWordPosition && checkAllReplacedWordPosition[i][1] >= matchedWordPosition ){
                withinReplacedWordPosition = true
            }
        }

        return withinReplacedWordPosition
    } else {
        return withinReplacedWordPosition
    }
}






function checkCapitalLetter(text, regexPattern, returnWord){
    const portion2Replace = text.match(regexPattern)[0]

    const inputArray = portion2Replace.split(" ")
    const outputArray = returnWord.split(" ")
    
    console.log( inputArray )
    console.log( outputArray )

    
    let y = 0
    for(let i = 0; i < inputArray.length; i++){
        if( inputArray[i] !== '' && inputArray[i] !== ' ' && inputArray[i] !== undefined){
            const firstCharacter = inputArray[i].slice(0,1)
            if( /[A-Z]/.test(firstCharacter) == true){ 
                let firstCharacterOutput = outputArray[y].slice(0,1)
                
                firstCharacterOutput = firstCharacterOutput.toUpperCase()                

                let appendCapitalLetter = firstCharacterOutput + outputArray[y].slice(1)
                outputArray[y] = appendCapitalLetter 

                y++
            } 
            
        }
    }
    

    let patchUpOutpur = ''
    for(let i=0; i < outputArray.length; i++){
        patchUpOutpur += outputArray[i]

        if(i+1 != outputArray.length){
            patchUpOutpur += ' '
        }
    }

    return patchUpOutpur
}




module.exports = Translator;