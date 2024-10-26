import store from "../data/store.js";
import axios from 'axios';


const myFunction = {

    filterEvent() {

        return store.eventsInTable.filter((elemento) => {
            return elemento.organizer_email.toLowerCase().match(store.userInput);
        })
    },

    deleteEvent(elemento) {
        axios.post(store.baseUrlApi + 'deleteEvent', { id: elemento }).then(response => {
            //console.log('evento eliminato');
            this.fillUpTable()
            store.showDialog = false

        })
    },

    fillUpTable() {

        axios
            .get(`${store.baseUrlApi}allEvents`)
            .then(response => {
                store.events = response.data.events;
                store.eventsInTable = [];
                // helper function per aggiungere gli eventi
                const addEvent = (start, end, title, content, organizer_email, id) => {
                    store.eventsInTable.push({
                        start,
                        end,
                        title,
                        content,
                        class: 'sport',
                        organizer_email,
                        id,
                    });
                };
                store.events.forEach(element => {
                    let startDay = new Date(element.start_date);
                    let endDay = new Date(element.end_date);
                    let daysOfDifference = Math.floor((endDay - startDay) / (1000 * 60 * 60 * 24));
                    //l'evento inizia e finisce lo stesso giorno 
                    if (element.start_date == element.end_date) {
                        addEvent(`${element.start_date} ${element.start_hour}`, `${element.end_date} ${element.end_hour}`, element.title, element.description, element.user_email, element.id);

                        //l'evento finisce il giorno dopo della data d'inizio 
                    } else if (daysOfDifference == 1) {
                        addEvent(`${element.start_date} ${element.start_hour}`, `${element.start_date} 23:59`, element.title, element.description, element.user_email, element.id);
                        addEvent(`${element.end_date} 00:00`, `${element.end_date} ${element.end_hour}`, element.title, element.description, element.user_email, element.id);

                        //l'evento dura piu di 2 giorni
                    } else if (daysOfDifference > 1) {
                        addEvent(`${element.start_date} ${element.start_hour}`, `${element.start_date} 23:59`, element.title, element.description, element.user_email, element.id);

                        // converto la stringa in un oggetto Date
                        let date = new Date(element.start_date);
                        // aggiungo un giorno alla data 
                        date.setDate(date.getDate() + 1);
                        // riformatto la data in stringa rimuovendo dalla T , ore e minuti
                        let newDateString = date.toISOString().split('T')[0];
                        while (newDateString < element.end_date) {
                            addEvent(`${newDateString} 00:00`, `${newDateString} 23:59`, element.title, element.description, element.user_email, element.id);
                            let nextDay = new Date(newDateString);
                            nextDay.setDate(nextDay.getDate() + 1);
                            newDateString = nextDay.toISOString().split('T')[0];
                        }
                        addEvent(`${element.end_date} 00:00`, `${element.end_date} ${element.end_hour}`, element.title, element.description, element.user_email, element.id);
                    }


                });
                // console.log(this.store.events);
            })
    },

    async newEvent(data) {
        try {
            // creare un nuovo evento
            const response = await axios.post(`${store.baseUrlApi}events`, data);
            store.success = response.data.success;

            // ripulisco i campi di input
            store.title = '';
            store.userEmail = '';
            store.description = '';
            store.location = '';
            store.startDate = '';
            store.endDate = '';
            store.startHour = '';
            store.endHour = '';
            store.loading = false;

            //pusho in eventi in tab
            this.fillUpTable();
        } catch (error) {
            console.log(error);
        }
    },



    sendForm() {
        store.loading = true;
        const data = {
            'title': store.title,
            'user_email': store.userEmail,
            'description': store.description,
            'location': store.location,
            'start_date': store.startDate,
            'end_date': store.endDate,
            'start_hour': store.startHour,
            'end_hour': store.endHour,

        };
        this.newEvent(data)
        // pulisco l'array con i messaggi
        store.errors = {};
    },


}

export default myFunction;