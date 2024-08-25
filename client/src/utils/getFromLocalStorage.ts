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



export default function getFromLocalStorage (name:string){

    if(localStorageTest ()){
        const storage= JSON.parse(localStorage.getItem(`${name}`) || '')

        return storage
    }


}