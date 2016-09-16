class Hamming {

    compute( a , b ){

        if( a.length !== b.length ){

            throw new Error('DNA strands must be of equal length.');

        }

        const diff  = ( a , b , i , diffs ) => {

            if ( i  < 0 ){

                return diffs;

            }

            if ( a [ i ] !== b [ i ] ){

                diffs += 1;

            }

            i -= 1;

            return diff( a , b , i , diffs );

        };

        return  diff ( a , b , a.length , 0 );

    };

}

export default Hamming;
