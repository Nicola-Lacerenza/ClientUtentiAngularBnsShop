export class user{

    private static instance : user;
    
    private constructor(){
           
    }

    static getInstance = () : user => {
        if (!user.instance){
            user.instance = new user();
        }
        return user.instance;
    }

    loggedUser = () : string | null =>(sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

    isLogged = () : boolean => (sessionStorage.getItem("Utente")) ? true : false;

    clearUser = () : void => sessionStorage.removeItem("Utente");

    clearAll = () : void => sessionStorage.clear();

}