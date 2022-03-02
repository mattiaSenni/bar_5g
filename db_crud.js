var  config = require('./dbconfig');
const  sql = require('mssql');

async function loginUtenti(username, password){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('email', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query("SELECT Utenti.ID, Utenti.Nome, Cognome, Classe, Data_Nascita, Scuola.Nome, Email, Indirizzo, Citta FROM Utenti INNER JOIN Scuola ON IDScuola = Scuola.ID WHERE Utenti.Email = @email AND Password = @password");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function loginDipendenti(username, password){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('user', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query("SELECT Dipendenti.ID, Username, Ruolo, Bar.Nome, Indirizzo, Citta, Scuola.Nome FROM Dipendenti INNER JOIN Bar ON IDBar = Bar.ID INNER JOIN Scuola ON IDScuola = Scuola.ID WHERE Username = @user AND Password = @password");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function getBar(IDBar){
    try{
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDBar', sql.Int, IDBar)
        .query("SELECT Bar.ID, Bar.Nome AS NomeBar, Scuola.Nome AS NomeScuola, Indirizzo, Citta FROM Bar INNER JOIN Scuola ON IDScuola = Scuola.ID WHERE Bar.ID = @IDBar");
        return product.recordset;
    }
    catch(error){
        console.log(error)
    }
}

async function getMenu(IDBar){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDBar', sql.Int, IDBar)
        .query("SELECT * FROM Menu INNER JOIN BarMenu ON IDMenu = Menu.ID INNER JOIN Bar ON IDBar = Bar.ID WHERE IDBar = @IDBar");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function getProdotto(IDBar, IDProdotto){
    //TODO: Aggiungere info su scuola
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDBar', sql.Int, IDBar)
        .input('IDProdotto', sql.Int, IDProdotto)
        .query("SELECT Prodotto.ID, Prodotto.Nome, Descrizione, Categoria, Prezzo FROM Menu INNER JOIN BarMenu ON IDMenu = Menu.ID INNER JOIN Bar ON IDBar = Bar.ID INNER JOIN MenuProdotto ON BarMenu.IDMenu = Menu.ID INNER JOIN Prodotto ON IDProdotto = Prodotto.ID INNER JOIN Categoria ON Categoria.ID = IDCategoria WHERE IDBar = @IDBar AND Prodotto.ID = @IDProdotto");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
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

async function postPrenotazione(idUser, data){
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
    getBar,getMenu, getProdotto, register, getUser, deleteUser, updateUser, getPrenotazioni, postPrenotazione, deletePrenotazione, updatePrenotazione, getPrenotazione, login
}