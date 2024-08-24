function localStorageTest (){
    const test = "test" +new Date().valueOf()
    try{
        localStorage.setItem(test,test)
        localStorage.removeItem(test)
        return true
    }catch(error){
        return false
    }
}



export default function getArrayFromLocalStorage (arr:string){

    if( localStorageTest ()){
        const dictionary= JSON.parse(localStorage.getItem(`${arr}`) || '[]')

        return dictionary
    }


}