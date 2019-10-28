function factorial(number){
    if(number<0){
        console.log("Neexistuje");
        return -1;
    }

    if(number == 0) {
        return 1;
    } else {
        product = 1;
        for(i = 1; i <= number; i++) {
            product *= i;
        }
    }
    return product;    
}
module.exports = factorial;

// function factorial(number){
//     if(number<0) {
//         //throw "Faktorial zaporneho cisla neexistuje!"
//         throw new Error("Faktorial zaporneho cisla neexistuje!");
//     } else {
//         if(number == 0) {
//             return 1;
//         } else {
//             product = 1;
//             for(i = 1; i <= number; i++) {
//                 product *= i;
//             }
//         }
//         return product; 
//     }

       
// }
// module.exports = factorial;