console.log("Hello TypeScript")

// const user = {
//     name: "Mohamed",
//     id: 0,
// };

interface User{
    readonly id: number;
    name: string;
    email?: string;
    gender: Gender;
}
type Gender = 'male' | 'female'

const user:User = {
    id:0,
    name: 'Mohamed',
    gender: 'male'
}

interface Profile extends User{}

@first()
class UserAccount{
    
    constructor(protected message: string) {
        console.log(this.message)
    }
    
}

console.log('test');

let user1 = new UserAccount('Mohamed');

function getLength(obj: string | string[]){
    return obj.length
}

console.log(getLength('TEST Length'));

const hello = <testmessage = string>(message: testmessage):testmessage=>{
    return message
}
const test = <messageType = number>(num1:messageType, num2:messageType): string=>{
    return num1 + ' ' + num2
}

console.log(test<number>(50, 80));
console.log(typeof(test<number>(50, 80)));

function first(value?: string ){
    if(value){
        console.log(`value: ${value}`)
    }else{
        console.log("first Decorator Test");
    }
    return function(target: any){
        console.log("first Called")
    }
}

const array:any[] = ['ali', 'mohamed', 2, 5]
console.log(array)