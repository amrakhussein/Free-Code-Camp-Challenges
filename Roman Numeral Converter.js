 
function convertToRoman(num) {
    // mapping unique roman char into num in dictionay
    let romanLookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}

    var romanChar = ''

    // validating true num
    if (isNaN(num)){
        console.log('not num: ', num)
        return false
    }else{
        // console.log(num)
        for (let key in romanLookup) {
            // console.log(key)
            while (num >= romanLookup[key]){
                romanChar += key
                num -= romanLookup[key]
     
                // console.log(romanChar)
            }
            // console.log('Key ', key)
        }
    }
    console.log(romanChar)
    return romanChar


   

   }
   
convertToRoman(88);


