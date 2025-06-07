const clientsDB = require('../libs/client');
const boom = require('@hapi/boom');

class Client{
    constructor(){}

    static async getAllClients(min, max){
        if(!max) max = Infinity;
        if(!min) min = 0;

        const filteredClients = await clientsDB.find().where('spentAmount').gte(min).where('spentAmount').lte(max);

        return filteredClients;

    }

    static async createClient(receivedClient){
        const client = new clientsDB(receivedClient);
        await client.save();
        return true;
    }

    static async getVip(threshold){
        const vipClients = await clientsDB.find().where('spentAmount').gt(threshold);

        return vipClients;
    }

    static async getOne(clientIndex){
        const retrievedClient = await clientsDB.findById(clientIndex);
        if(!retrievedClient){
            throw boom.notFound('Client not found :(')
        }
        return retrievedClient;
    }

    static async updateClient(clientIndex, receivedInfo){
        const clientToUpdate = await this.getOne(clientIndex);
        clientToUpdate.overwrite(receivedInfo);
        const updatedClient = await clientToUpdate.save();
        return updatedClient;
    }

    static async addSpentAmount(id, amount){
        const client = await this.getOne(id);
        client.spentAmount += amount;
        await client.save();
        return client;
    }

    static async deleteClient(clientIndex){
        const client = await this.getOne(clientIndex);
        await clientsDB.findByIdAndDelete(clientIndex);
        return client;
    }

}

module.exports = Client;