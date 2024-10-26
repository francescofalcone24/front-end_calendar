import { reactive } from "vue";

const myData = reactive({
    //URL
    baseUrlApi: "http://localhost:8000/api/",
    baseUrl: "http://localhost:8000/",

    //ALL EVENTS FROM DB
    events: [],
    eventsInTable: [],
    filterEvents: [],
    showDialog: false,

    //SEND BUTTON
    loading: false,
    success: false,
    errors: {},

    //EVENT DETAILS
    title: '',
    userEmail: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',

    //INPUT FILTER
    userInput: '',
});

export default myData;