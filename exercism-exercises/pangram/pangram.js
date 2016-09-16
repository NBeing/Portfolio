class Pangram {

    constructor ( text ){

        this.text = text;

    };

    isPangram(){

        return this.text
            .replace( /[^A-Za-z]+/g , " ")
            .replace( /[\s\s+]/g , "")
            .toLowerCase()
            .split("")
            .reduce( ( prev, cur  ) => {

                prev.indexOf(cur) == -1 ? prev.push(cur) : null;

                return prev;

            }, [])

            .length == 26 ? true : false;

    };
}
export default Pangram;
