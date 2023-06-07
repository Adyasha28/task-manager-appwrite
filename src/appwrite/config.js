import { Account, Client, Databases } from 'appwrite';
import { PROJECT_ID } from './constants';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

export default client;

export const account=new Account(client);

export const databases=new Databases(client);