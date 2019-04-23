//import { AssertionError } from "assert";
//const assert = require('assert');
/*
 * From Mozilla Developer Network:
 * The Promise.race(promises) method returns a promise that resolves or rejects
 * as soon as one of the promises in the array resolves or rejects,
 * with the value or reason from that promise.
 */
function race(promises) {
    return new Promise ((res,rej)=>{
        promises.forEach(p => p.then(res).catch(rej)); 
    });
}

/*
const promise1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one');
});
 
const promise2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'two');
});

race([promise1, promise2]).then(function(value) {
  console.log(value);
// Both resolve, but promise2 is faster
});
// expected output: "two"
*/


/*
 * Write a function that takes an arbitrarily
 * nested array and generates the sequence
 * of values from the array.
 * Example: [...flatten([1, [2, [3]], 4, [[5, 6], 7, [[[8]]]]])] => [1, 2, 3, 4, 5, 6, 7, 8]
 */
function* flatten(array) {
    if(Array.isArray(array)){ 
        for (var ourVal of array){
            yield *flatten(ourVal);
        }
    }
     else{
          yield array;
     }
}

//checking Q.3.2 flatten(array) function.
//console.log(Array.from(flatten([1, [2, [3]], 4, [[5, 6], 7, [[[8]]]]])));
//console.log([...flatten([1, [2, [3]], 4, [[5, 6], 7, [[[8]]]]])]);

/*
 * Given two generators, write a function
 * that generates the interleaved sequence
 * of elements of both generators.
 * Example: given generators for even and odd
 * numbers, take(interleave(evens(), odds()), 8) => [0, 1, 2, 3, 4, 5, 6, 7]
 */
function* interleave(g1, g2){
   for(let n=0;;n++){
       const temp1 = g1.next();
       if(!temp1.done){
           yield temp1.value;
       }

       const temp2 = g2.next();
       if(!temp2.done){
           yield temp2.value;
       }
       if(temp1.done & temp2.done)
            break;
   }      
}

/*
function* evens(){
    var i = 0;
    while(true){
        yield i;
        i = i + 2;
    }
}

function* odds(){
    var i = 1;
    while(true){
        yield i;
        i = i + 2;
    }
}
*/
//console.log(take(interleave(evens(), odds()), 8));
//console.log(interleave([1,2,3],[4,5,6]));

  
/*
 * Write a function that continuously generates
 * elements of a given array in a cyclic manner.
 * Example: take(cycle([1, 2, 3]), 8) => [1, 2, 3, 1, 2, 3, 1, 2]
 */
function* cycle(array){  
    while (array.length !== 0){
        let getFirst = array.shift();
        array.push(getFirst);
        yield getFirst;
    }
    
}
//console.log(take(cycle([1, 2, 3]), 8));
//console.log(take(cycle([1, 2, 3]), 9));
//console.log(take(cycle([1, 2, 3]), 10));


/*
 * Write a function that returns
 * all elements from the first array,
 * then all elements from the next array, etc.
 * This function lets us to treat an array of arrays
 * as a single collection.
 * Example: [...chain([['A', 'B'], ['C', 'D']])] => ['A', 'B', 'C', 'D']
 */

function* chain(arrays){
    for(let ourArray of arrays){
        for(let ourVal of ourArray){
            yield ourVal;
        }
    }
}


//console.log(Array.from(chain([['A', 'B'], ['C', 'D']])));
//console.log([...chain([['A', 'B'], ['C', 'D']])]);
//console.log(Array.from(chain([['A', 'B'], ['C', 'D'],['E','F']])));

/*
 * In order to make testing your generators easier,
 * the function take takes a generator g and a natural number n
 * and returns an array of the first n elements of g.
 * If g is exhausted before reaching n elements,
 * less than n elements are returned. 
 */
function take(g, n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        const { value, done } = g.next();
        if (done) {
            break;
        }
        result.push(value);
    }
    return result;
}






