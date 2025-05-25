const clientsDB = require('../libs/client');

class Client{
    constructor(){}

    static getAllClients(min, max){
        if(!max) max = Infinity;
        if(!min) min = 0;

        const filteredClients = {};
        let filteredCounter = 0;
        for(const [key, client] of Object.entries(clientsDB)){
            if(client.spentAmount > min && client.spentAmount < max){
                filteredClients[filteredCounter] = client;
                filteredCounter++;
            }
        }

        return filteredClients;

    }

    static createClient(receivedClient){
        const clientIndex = Object.keys(clientsDB).length;
        clientsDB[clientIndex] = receivedClient;
        console.log({clientsDB})
        return true;
    }

    static getVip(threshold){
        const vipClients = {}
        let vipCounter = 0

        for(const [key, client] of Object.entries(clientsDB)){
            if(client.spentAmount >= threshold){
                vipClients[vipCounter] = client;
                vipCounter++;
            }
        }

        return vipClients;
    }

    static getOne(clientIndex){
        const retrievedClient = clientsDB[clientIndex];
        return retrievedClient;
    }

    static updateClient(clientIndex, receivedInfo){
        clientsDB[clientIndex] = receivedInfo;
        return clientsDB[clientIndex];
    }

    static addSpentAmount(id, amount){
        clientsDB[id].spentAmount += amount;
        return clientsDB[id];
    }

    static deleteClient(clientIndex){
        const clientToDelete = clientsDB[clientIndex];
        delete clientsDB[clientIndex];
        return clientToDelete;
    }



}

module.exports = Client;