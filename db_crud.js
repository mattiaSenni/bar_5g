var  config = require('./dbconfig');
const  sql = require('mssql');

async function loginUtenti(username, password){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('email', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query("SELECT Utenti.ID, Utenti.Nome, Cognome, Classe, Data_Nascita, Scuola.Nome AS NomeScuola, Email, Indirizzo, Citta FROM Utenti INNER JOIN Scuola ON IDScuola = Scuola.ID WHERE Utenti.Email = @email AND Password = @password");
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
        .query("SELECT Menu.ID, Menu.Nome, Prezzo, Bar.Nome AS NomeBar FROM Menu INNER JOIN BarMenu ON IDMenu = Menu.ID INNER JOIN Bar ON IDBar = Bar.ID WHERE IDBar = @IDBar");
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
        .query("SELECT Prodotto.ID, Prodotto.Nome, Descrizione, Categoria, Prezzo FROM Menu INNER JOIN BarMenu ON IDMenu = Menu.ID INNER JOIN Bar ON IDBar = Bar.ID INNER JOIN MenuProdotto ON MenuProdotto.IDMenu = Menu.ID INNER JOIN Prodotto ON IDProdotto = Prodotto.ID INNER JOIN Categoria ON Categoria.ID = IDCategoria WHERE IDBar = @IDBar AND Menu.ID = @IDProdotto");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}


async function getUser(idUser){
    try {
        //problema id
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('ID', sql.Int, idUser)
        .query("SELECT Utenti.Nome, Utenti.Cognome, Utenti.Classe, Utenti.Data_Nascita, Utenti.Email, Scuola.Nome AS NomeScuola, Scuola.Indirizzo, Scuola.Citta from Utenti INNER JOIN Scuola ON Utenti.IDScuola = Scuola.ID WHERE Utenti.ID = @ID");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function deleteUser(userId){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('ID', sql.Int, userId)
        .query("DELETE from Utenti WHERE ID = @ID");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function updateUser(userId, name, surname)
{
    // try {
    //     let  pool = await  sql.connect(config);
    //     let  product = await  pool.request()
    //     .input('ID', sql.Int, userID)
    //     .input('Nome', sql.NVarChar, name)
    //     .input('Cognome', sql.NVarChar, surname)
    //     .query("UPDATE Utenti SET Nome = @Nome, Cognome = @Cognome WHERE ID = @ID");
    //     return  product.recordsets;
    // }
    //     catch (error) {
    //     console.log(error);
    // }
}

async function getPrenotazioni(idUser){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('ID', sql.Int, idUser)
        .query("SELECT Prenotazioni.ID, Modalita_pagamento, Prenotazioni.Data, Stato ,Utenti.Nome, Utenti.Cognome, Utenti.Classe, Utenti.Data_Nascita, Utenti.Email, Scuola.Nome AS NomeScuola, Scuola.Indirizzo, Scuola.Citta, Saldo, Tipologia, Ora_Inizio, Ora_Fine from Prenotazioni INNER JOIN Utenti ON Utenti.ID = Prenotazioni.IDUtente LEFT JOIN Transazioni ON Transazioni.ID = IDTransazione INNER JOIN FasciaOraria ON IDFasciaOraria = FasciaOraria.ID INNER JOIN Scuola ON IDScuola = Scuola.ID LEFT JOIN Provenienza ON IDProvenienza = Provenienza.ID WHERE Prenotazioni.IDUtente = @ID");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function postPrenotazione(idUser, data, stato, idFasciaOraria, modalitaPagamento){
    try {
        let  pool = await  sql.connect(config);
        await pool.request()
        .input('IDUser', sql.Int, idUser)
        .input('data', sql.VarChar, data)
        .input('stato', sql.Int, stato)
        .input('modalitaPagamento', sql.Int, modalitaPagamento)
        .input('idFasciaOraria', sql.Int, idFasciaOraria)
        .query("INSERT INTO Prenotazioni (IDUtente, Modalita_pagamento, Data, Stato, IDFasciaOraria) VALUES (@IDUser, @modalitaPagamento, @data, @stato, @idFasciaOraria)");
        // return  product.recordsets;
        let  pool2 = await  sql.connect(config);
        let  product2 = await  pool2.request()
        .input('IDUser', sql.Int, idUser)
        .input('data', sql.VarChar, data)
        .input('stato', sql.Int, stato)
        .input('modalitaPagamento', sql.Int, modalitaPagamento)
        .input('idFasciaOraria', sql.Int, idFasciaOraria)
        .query("SELECT ID FROM Prenotazioni WHERE Data=@data AND IDUtente=@IDUser");
        let pren = await  product2.recordsets;
        return pren;
        
    }
        catch (error) {
        console.log(error);
    }
}

async function insertProductInPrenotazione(idPrenotazione, idProdotto, qt){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDPrenotazione', sql.Int, idPrenotazione)
        .input('IDMenu', sql.Int, idProdotto)
        .input('qt', sql.Int, qt)
        .query("INSERT INTO PrenotazioneMenu (IDPrenotazione, IDMenu, Quantita) VALUES (@IDPrenotazione, @IDMenu, @qt)");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function deletePrenotazione(idPrenotazione){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDPrenotazione', sql.Int, idPrenotazione)
        .query("DELETE FROM Prenotazioni WHERE ID = @IDPrenotazione");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function updatePrenotazione(idPrenotazione, data){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDUser', sql.Int, idUser)
        .input('IDPrenotazione', sql.Int, idPrenotazione)
        .input('Data', sql.DateTime, data)
        .query("UPDATE Prenotazioni SET Data = @Data WHERE ID=@IDPrenotazione");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function getPrenotazione(idPrenotazione){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDPrenotazione', sql.Int, idPrenotazione)
        .query("SELECT Prenotazioni.ID, Modalita_pagamento, Menu.ID AS IDMenu, Menu.Nome, Prenotazioni.Data, Stato ,Utenti.Nome AS NomeUtente, Utenti.Cognome, Utenti.Classe, Utenti.Data_Nascita, Utenti.Email, Scuola.Nome AS NomeScuola, Scuola.Indirizzo, Scuola.Citta, Saldo, Tipologia, Ora_Inizio, Ora_Fine  FROM Prenotazioni  INNER JOIN Utenti ON Utenti.ID = Prenotazioni.IDUtente  LEFT JOIN Transazioni ON Transazioni.ID = IDTransazione  INNER JOIN FasciaOraria ON IDFasciaOraria = FasciaOraria.ID  INNER JOIN Scuola ON IDScuola = Scuola.ID  LEFT JOIN Provenienza ON IDProvenienza = Provenienza.ID LEFT JOIN PrenotazioneMenu ON PrenotazioneMenu.IDPrenotazione = Prenotazioni.ID LEFT JOIN Menu ON PrenotazioneMenu.IDMenu = Menu.ID WHERE 2 = Prenotazioni.ID");
        return  product.recordsets; 
    }
        catch (error) {
        console.log(error);
    }
}

async function updateBar(idBar, nome){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDBar', sql.Int, idBar)
        .input('Nome', sql.Int, nome)
        .query("UPDATE Bar SET Nome = @Nome WHERE ID = @IDBar");        
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function postProdotto(idBar, nome){
    /*try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('IDBar', sql.Int, idBar)
        .input('Nome', sql.Int, nome)
        .query("UPDATE Bar SET Nome = @Nome WHERE ID = @IDBar");        
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }*/
}

async function deleteBar(idBar){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('ID', sql.Int, idBar)
        .query("DELETE FROM Bar WHERE ID = @ID");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function getProdotto(idPrenotazione){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('ID', sql.Int, idPrenotazione)
        .query("SELECT Prodotto.Nome, Prodotto.Descrizione, Categoria.Categoria, Menu.Nome AS NomeMenu, Allergeni.Nome AS NomeAllergeni FROM Prenotazioni INNER JOIN PrenotazioneMenu ON IDPrenotazione = Prenotazioni.ID INNER JOIN Menu ON PrenotazioneMenu.IDMenu = Menu.ID INNER JOIN MenuProdotto ON MenuProdotto.IDMenu = Menu.ID INNER JOIN Prodotto ON MenuProdotto.IDProdotto = Prodotto.ID INNER JOIN Categoria ON Prodotto.IDCategoria = Categoria.ID LEFT JOIN ProdottoAllergeni ON ProdottoAllergeni.IDProdotto = Prodotto.ID LEFT JOIN Allergeni ON ProdottoAllergeni.IDAllergeni = Allergeni.ID WHERE Prenotazioni.ID = @ID");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}

async function getProdottiMenu(idMenu){
    try {
        let  pool = await  sql.connect(config);
        let  product = await  pool.request()
        .input('ID', sql.Int, idMenu)
        .query("SELECT Prodotto.Nome, Prodotto.Descrizione, Categoria.Categoria, Allergeni.Nome AS NomeAllergeni FROM Menu  INNER JOIN MenuProdotto ON Menu.ID = MenuProdotto.IDMenu  INNER JOIN Prodotto ON Prodotto.ID = MenuProdotto.IDProdotto  INNER JOIN Categoria ON Categoria.ID = Prodotto.IDCategoria  LEFT JOIN ProdottoAllergeni ON ProdottoAllergeni.IDProdotto = Prodotto.ID  LEFT JOIN Allergeni ON ProdottoAllergeni.IDAllergeni = Allergeni.ID  WHERE Menu.ID = @ID");
        return  product.recordsets;
    }
        catch (error) {
        console.log(error);
    }
}



module.exports = {
    getBar,getMenu, getProdotto, getUser, deleteUser, updateUser, getPrenotazioni, postPrenotazione, deletePrenotazione, updatePrenotazione, getPrenotazione, loginUtenti, loginDipendenti, updateBar, postProdotto, deleteBar, insertProductInPrenotazione, getProdotto, getProdottiMenu
}