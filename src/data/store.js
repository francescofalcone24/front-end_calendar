import { reactive } from "vue";

const myData = reactive({
    baseUrlApi: "http://localhost:8000/api/",
    baseUrl: "http://localhost:8000/",

    events: [],
    eventsInTable: [],

    loading: false,
    success: false,
    errors: {},
    title: '',
    userEmail: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',

    userInput: '',
});

export default myData;