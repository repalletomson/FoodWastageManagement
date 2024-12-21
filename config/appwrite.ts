import { Client, Account, Databases, Storage, Avatars, ID, Query } from 'appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.tomson.FoodRescue',
    projectId: '673a3d4e00168b9f1365',
    databaseId: '673a3ef6003e0b0ad550',
    userCollectionId: '673a3f2e002b91b9c563',
    donationCollectionId: '673a3f6d0034fd7b8c27',
    imagesId: '673a3f9e002186c7307b',
    storageId: '673a43640008d69d5db5',
    bucketId:'673a43640008d69d5db5'
}
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')  
    .setProject(appwriteConfig.projectId)  

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);



// export const createUser=()=>{
//        account.create(ID.unique(),"test@test.com","test1234","test").then(function(response){
//         console.log(response);
//     },function(error){
//         console.log(error)
//     })
// }
export async function createUser(email: string, password: string, username: string) {
    try {
        const userId = ID.unique();

        const newAccount = await account.create(
            userId,
            email,
            password,
            username
        );

        if (!newAccount) throw new Error('Failed to create account');

        const session = await account.createSession(email, password);
        if (!session) throw new Error('Failed to create session');

        const avatarUrl = avatars.getInitials(username);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId,
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error: any) {
        console.error('Create user error:', error);
        throw error;
    }
}

// // Sign In
// export async function signIn(email: string, password: string) {
//     try {
//         const session = await account.createSession(email, password);
        
//         if (!session) throw new Error('Failed to create session');
        
//         return session;
//     } catch (error: any) {
//         console.error('Sign in error:', error);
//         throw error;
//     }
// }

// // Get Account
// export async function getAccount() {
//     try {
//         const currentAccount = await account.get();
  
//         return currentAccount;
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// // Get Current User
// export async function getCurrentUser() {
//     try {
//         const currentAccount = await getAccount();
//         if (!currentAccount) throw Error;
  
//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal("accountId", currentAccount.$id)]
//         );
  
//         if (!currentUser) throw Error;
  
//         return currentUser.documents[0];
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }

// // Sign Out
// export async function signOut() {
//     try {
//         const session = await account.deleteSession("current");
  
//         return session;
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// import { Account, Client, Databases } from 'appwrite';

// const client = new Client()
//     .setEndpoint('YOUR_APPWRITE_ENDPOINT')
//     .setProject('YOUR_PROJECT_ID');

// export const account = new Account(client);

// Helper function to generate valid Appwrite user IDs
const generateValidUserId = (email: string): string => {
    // Remove invalid characters and limit length to 36
    return email
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '_')  // Replace invalid chars with underscore
        .replace(/^[._-]+/, 'user_')     // If starts with special char, prepend 'user_'
        .slice(0, 36);                   // Limit to 36 chars
};

export const createAccount = async (email: string, password: string, name: string) => {
    try {
        const userId = generateValidUserId(email);
        const response = await account.create(
            userId,
            email,
            password,
            name
        );
        return response;
    } catch (error) {
        console.error('Create account error:', error);
        throw error;
    }
};

export const signInAccount = async (email: string, password: string) => {
    try {
        const session = await account.createSession(email, password);
        return session;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};

export { client };