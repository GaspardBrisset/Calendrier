const { ipcRenderer } = require('electron')
const mysql = require('mysql2');


// Create database connection 
function Connection() {
    return connect = mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        password: 'root',
        database: 'calendrier',
        port: 8889,
    })
}

const connexion = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'root',
    database: 'calendrier',
    port: 8889,
})
// Display the calendar in JS depending on the month and allows to change month 
    const app = document.getElementById("app")
    const appMonth = document.getElementById("appMonth")
    const appYear = document.getElementById("appYear")

    const add = document.getElementById("eventAdd")

    let monthNavigation = 0 ;

    if(app) {
        app.addEventListener("click", function(event){
            getEventId(event.target.dataset.id, function(err, rows, fields){
                if(err){
                    console.log(err)
                }
                else{
                    if(rows.length>0) {
                        ipcRenderer.invoke("viewEvent", rows[0])
                    }
                }
        })
        })
    
    // CALL ALL FUNCTION USED TO DISPLAY THE APP (calendrier, cases, month, year.)
        function afficheCalendrier(d) {

            app.innerHTML= ''

            let premierJourDuMois = new Date(d)
            premierJourDuMois.setDate(1)
            let numPremierJourDuMois = premierJourDuMois.getDay()

            if (numPremierJourDuMois == 0) numPremierJourDuMois = 7

            let month = d.getMonth();
            let nombreDeJourMois = new Date(d.getFullYear(), month + 1, 0);
            let numNombreJourDuMois = nombreDeJourMois.getDate()
            let numDernierJourDuMois = nombreDeJourMois.getDay()

            if (numDernierJourDuMois == 0) numDernierJourDuMois = 7
            
            let res;
            getAllEvents(d, function(err, rows, fields){   
                if(err){
                    console.log("An error ocurred performing the query.");
                    console.log(err);
                }
                else{
                    console.log("Query succesfully executed");
                    res = rows
                    for (let i = 1; i < numPremierJourDuMois; i++) {
                        ajouteCaseGrise()
                    }
                    for (let j = 1; j <= numNombreJourDuMois; j++) {
                        ajouteCaseActive(j)
                        for(let i in res){
                            if(res[i]["date_deb"].getDate() == j)
                            {
                                afficheEvents(res[i],j)
                            }
                        }
                    }
                    for (let i = numDernierJourDuMois; i < 7; i++) {
                        ajouteCaseGrise()
                    }
                }
            })
        }
        function ajouteCaseGrise() {
            let elem = document.createElement("div")
            elem.className = "caseInactive"
            app.appendChild(elem)
        }
        function ajouteCaseActive(num) {
            let elem = document.createElement("div")
            elem.className = "caseActive"
            elem.setAttribute("id", "caseActive" + num)
            elem.innerHTML = num
            app.appendChild(elem)
        }
        function afficheMonth(m) {
            let moisActuel = new Date(m)

            let numMoisActuel = moisActuel.getMonth()

            monthName = new Array ('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre')

            appMonth.innerHTML = '' 
            let elem = document.createElement("span")
            elem.className = "month"
            elem.innerHTML = monthName[numMoisActuel]
            appMonth.appendChild(elem)    
        }
        function afficheYear(y) {
            let anActuel = new Date(y)

            const numAnActuel = anActuel.toLocaleDateString('fr-eu', {
                year: 'numeric'
            })
            appYear.innerHTML = '' 
            let elem = document.createElement("span")
            elem.className = "year"
            elem.innerHTML = numAnActuel
            appYear.appendChild(elem)    
        }

        let maDate = new Date()
        let ceMois = maDate.getMonth() +1
        afficheCalendrier(maDate)
        afficheMonth(maDate)
        afficheYear(maDate)

        let back = document.getElementById("back")
        let next = document.getElementById("next")
    
    
        function initButtons (){
            next.addEventListener('click',()=> {
                maDate = new Date(maDate.getFullYear(),maDate.getMonth()+1,1)
                afficheCalendrier(maDate)
                afficheMonth(maDate)
                afficheYear(maDate)
            }) 
    
            back.addEventListener("click",()=> {
                maDate = new Date(maDate.getFullYear(),maDate.getMonth()-1,1)
                afficheCalendrier(maDate)
                afficheMonth(maDate)
                afficheYear(maDate)
            })
        }
        initButtons()
    
    // initialize light and dark modes 
        document.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', darkMode);
        });
        
        function darkMode() {
            let body = document.querySelector('body');
            let mode = this.dataset.mode;
            body.dataset.theme = mode;
        }
    
        function getAllEvents(date, cb){
            let month = date.getMonth()+1
            if(month<10){month = "0"+month}
            let dateComplete = date.getFullYear()+"-"+month+"%";
            let query = 'SELECT * FROM event WHERE date_deb LIKE ?';
            connexion.query(query,[dateComplete], cb)
        }
        function getEventId(id, cb) {
            Connection()
            let query = "SELECT * FROM event WHERE id = ?";
            connect.query(query, [id], cb)
        }
    
        function getAll(){
            return new Promise((resolve, rej) => {
                let query = 'select * from event';
                connexion.query(query, cb)
            })
        }
        function afficheEvents(event, caseCalendrier){
            let elem = document.createElement("div")
            elem.className = "event"
            elem.setAttribute("id", "event")
            elem.setAttribute("data-id", event["id"])
            elem.innerHTML = event["titre"]
            document.getElementById("caseActive"+caseCalendrier).appendChild(elem)
            
        }
    
        const buttonAdd = document.getElementById('eventAdd');
        
        buttonAdd.addEventListener('click', () => {
            ipcRenderer.invoke("addBrowserWindow")
        });
    }
    


  