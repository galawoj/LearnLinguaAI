
function localStorageTest (){
    const test = "test" + new Date().valueOf()
    try{
        localStorage.setItem(test,test)
        localStorage.removeItem(test)
        return true
    }catch(error){
        return false
    }
}

export default function setArrayInLocalStorage(name:string,obj:object|object[]){
    
if(localStorageTest()){
    localStorage.setItem(`${name}`,JSON.stringify(obj))
}

}