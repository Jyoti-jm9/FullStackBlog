import conf from '../config/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new this.Client();
    account;

    constructor() {
      this.client 
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
      
    }
    // sign up
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
 // log in 
 async login({email, password}) {
    try {
        return await this.account.createEmailSession(email, password);
    } catch (error) {
        throw error;
    }
}

async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
}
//logout 
async logout() {

    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
    }
}

}

const authService = new AuthService();

export default authService