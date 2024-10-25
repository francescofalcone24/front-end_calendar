<script>
// import { RouterView } from 'vue-router';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import store from './data/store.js';
import Function from './helpers/function.js';
import axios from 'axios';
import HeaderApp from './components/HeaderApp.vue';


export default {
  components: {
    VueCal,
    HeaderApp
  },


  data() {
    return {
      store,
      Function,
      selectedEvent: {},
      showDialog: false,
      events: [
        {
          start: '2024-10-25 14:00',
          end: '2024-10-25 17:30',
          title: 'Boring event',
          content: 'I am not draggable, not resizable and not deletable.',
          class: 'blue-event',
          deletable: true,
          resizable: true,
          draggable: false,
          editable: false,
        },
        // other events.
      ]

    };

  },

  methods: {
    prova(elemento) {
      axios.post(store.baseUrlApi + 'deleteEvent', { id: elemento }).then(response => {
        console.log('evento eliminato');
        Function.fillUpTable()
        this.showDialog = false

      })
    },
    onEventClick(event, e) {
      this.selectedEvent = event
      this.showDialog = true

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation()
    }
  },
  mounted() {

    Function.fillUpTable()

  }
}

</script>

<template>
  <HeaderApp />
  <div class="container">
    <div class="row m-0">
      <div class="col-12">

        <!-- OFFCANVAS -->
        <div class="">
          <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop">Create new event</button>

          <div class="h-75 bg-secondary offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop"
            aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
              <h5 id="offcanvasTopLabel">Create new event</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">

              <!-- FORM -->
              <form class="col-12 text-start" @submit.prevent="Function.sendForm()">
                <div class="row m-0">

                  <div class="mb-3 col-3">
                    <input class="border-0 border-bottom form-control" :class="{ 'is-invalid': store.errors.title }"
                      type="text" name="title" id="title" placeholder="title" v-model="store.title">
                    <p v-for="(error, index) in store.errors.title" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                  <div class="mb-3 col-3">
                    <input class="border-0 border-bottom form-control" :class="{ 'is-invalid': store.errors.email }"
                      type="text" name="user_email" id="userEmail" placeholder="Email" v-model="store.userEmail">
                    <p v-for="(error, index) in store.errors.userEmail" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                  <div class="mb-3 col-3">
                    <textarea class="border-0 border-bottom form-control"
                      :class="{ 'is-invalid': store.errors.message }" name="description" id="description" cols="30"
                      rows="10" placeholder="description" v-model="store.description"></textarea>
                    <p v-for="(error, index) in store.errors.description" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                  <div class="mb-3 col-3">
                    <input class="border-0 border-bottom form-control" :class="{ 'is-invalid': store.errors.name }"
                      type="text" name="location" id="location" placeholder="location" v-model="store.location">
                    <p v-for="(error, index) in store.errors.location" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                  <div class="mb-3 col-3">
                    <label for="startDate">Start Date</label><br>
                    <input type="date" class="border-0 border-bottom form-control me-3"
                      :class="{ 'is-invalid': store.errors.startDate }" name="start_date" id="startDate"
                      v-model="store.startDate">
                    <p v-for="(error, index) in store.errors.startDate" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                  <div class="mb-3 col-3">
                    <label for="endDate">End Date</label><br>
                    <input type="date" class="border-0 border-bottom form-control me-3"
                      :class="{ 'is-invalid': store.errors.endDate }" name="end_date" id="endDate"
                      v-model="store.endDate">
                    <p v-for="(error, index) in store.errors.endDate" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                  <div class="mb-3 col-3">
                    <label for="startHour">Start at</label><br>
                    <input type="time" class="border-0 border-bottom form-control me-3"
                      :class="{ 'is-invalid': store.errors.startHour }" name="start_hour" id="startHour"
                      v-model="store.startHour">
                    <p v-for="(error, index) in store.errors.startHour" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                  <div class="mb-3 col-3">
                    <label for="endHour">End at</label><br>
                    <input type="time" class="border-0 border-bottom form-control me-3"
                      :class="{ 'is-invalid': store.errors.endDate }" name="end_hour" id="endHour"
                      v-model="store.endHour">
                    <p v-for="(error, index) in store.errors.endHour" :key="`message-error-${index}`"
                      class="invalid-feedback">
                      {{ error }}
                    </p>
                  </div>
                </div>

                <button class="btn btn-lg btn-primary text-white" type="submit">{{ store.loading ?
                  'Sending...' : 'Send'
                  }}</button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="my-2">
      <vue-cal :time-from="1 * 60" :time-to="24 * 60" :disable-views="['years', 'year']" hide-view-selector
        hide-weekends :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false, }"
        :events="store.eventsInTable" :on-event-click="onEventClick" class="vuecal--full-height-delete calendar_table">
      </vue-cal>
      <v-dialog v-model="showDialog">
        <v-card>
          <v-card-title>
            <span>{{ selectedEvent.title }}</span>
            <span @click="prova(selectedEvent.id)"><i class="fa-solid fa-trash"></i></span>
          </v-card-title>

        </v-card>
      </v-dialog>
      <!-- <vue-cal class="calendar_table" :time-from="1 * 60" :time-to="24 * 60" :time-step="60" show-time-in-cells -->
      <!-- :events="store.eventsInTable"> -->
      <!-- </vue-cal> -->
    </div>


  </div>





</template>

<style scoped>
.calendar_table {
  background-color: lightgrey;
  color: black;
}

.vuecal__store.eventsInTable.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>
