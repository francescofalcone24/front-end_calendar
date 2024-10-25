import store from "../data/store.js";
import axios from 'axios';


const myFunction = {

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
                store.events.forEach(element => {
                    store.eventsInTable.push({
                        start: element.start_date + ' ' + element.start_hour,
                        end: element.end_date + ' ' + element.end_hour,
                        title: element.title,
                        content: element.description,
                        class: 'sport',
                        id: element.id,
                    })
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