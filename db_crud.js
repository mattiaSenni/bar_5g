var  config = require('./dbconfig');
const  sql = require('mssql');


async function getBar(idBar){
    return {
        nome:'Pascal',
        id: idBar,
        scuola:'ITT Pascal',
        indirizzo:'via Bella 15',
        citta: 'Cesena',
        fascieOrarie:[
            {
                ora_inizio: '11:00',
                ora_fine: '12:00'
            }
        ]
    }
}

async function getMenu(idBar){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .query("SELECT * from Prenotazioni  ");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function getProdotto(idBar, idProdotto){
    return {
        nome:'coca-cola'
    }
}

async function register(username, password, name, surname){
    return {id:125}
}

async function getUser(idUser){
    return {
        nome:'Mattia',
        cognome:'Senni',
        classe:'4Z',
        scuola: 'ITT Pascal',
        idScuola:25
    }
}

async function deleteUser(userId){
    return {
        ok:true
    }
}

async function updateUser(userId, name, surname)
{
    return{
        ok:true
    }
}

async function getPrenotazioni(idUser){
    return {
        ok:true
    }
}

async function postPrenotazione(idUser){
    return {
        ok:true
    }
}

async function deletePrenotazione(idUser, idPrenotazione){
    return {
        ok:true
    }
}

async function updatePrenotazione(idUser, idPrenotazione, data){
    return {
        ok:true
    }
}

async function getPrenotazione(idUser, idPrenotazione){
    return {
        ok:true
    }
}

module.exports = {
    getBar,getMenu, getProdotto, register, getUser, deleteUser, updateUser, getPrenotazioni, postPrenotazione, deletePrenotazione, updatePrenotazione, getPrenotazione
}