class Words {
    count( text ){

        const words = {};

        text.toLowerCase()
            .replace( /[\s\s+]/g , " ")
            .split(" ")
            .filter( x => x !== "")
            .map( word => !words.hasOwnProperty(word)? words[word] = 1: words[word] +=1);

        return words;

    }
}

export default Words;
