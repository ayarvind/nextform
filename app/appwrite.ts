import { Client } from "appwrite";
const getAppWriteClient = (endpoint:string,projectId:string) => {
    const client = new Client();
    client
        .setEndpoint(endpoint)
        .setProject(projectId);
    return client;  
}

export default getAppWriteClient;