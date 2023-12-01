// ASSIGNATION PAR VALEUR, ASSIGNATION PAR REFERENCE




// dans le cas des variables primitives, le signe = opère une assignation par valeur

// ce qui signifie, que chacune des variables est indépendante de l'autre

let myNumber = 12

let myNumber2 = myNumber

// chacune de ces variables fait sa vie independdement de l'autre


myNumber += 3
console.log(myNumber2) //va donner 12 et non pas 13



// une variblae c'est deux choses : un nom et une valeur



// dans le cas des variables primitives, le signe = opère une assignation par valeur

// ce qui signifie, que chacune des variables est indépendante de l'autre

let myName = "Paul"

let myName2 = myName




myName = "Pauline"







// Dans le cas des variables complexes, le signe = opère une assignation par référence, 

// ce qui signifie que les 2 variables pointent vers une même valeur.

let user = {
    name: "Paul",
    age: 35
}

let user2 = { ...user } // on crée un tableau user indépendement du user2

// équivalent à let user2=user

user.name = "Stéphane"

user2.name = "Victoria"
//un log des deux user montrera que chauqe tabealu est indépendant






let arr1 = [2, 5, 7] //arr1 a pour reférenec le tableau --- il pointe vers

arr1.push(9)




let arr2 = arr1 // arr2 pointe vers la même réfernce que arr1




arr2.push('oiqshdiofgq')







console.log(arr1, arr2)