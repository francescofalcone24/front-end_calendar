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



    };

  },

  methods: {

    onEventClick(event, e) {
      this.selectedEvent = event
      store.showDialog = true

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation()
    }
  },
  mounted() {

    Function.fillUpTable()


  },
}

</script>

<template>
  <HeaderApp />
  <div class="my_vh">

    <div class="container">
      <div class="row m-0">
        <div class="col-12 p-0">

          <!-- OFFCANVAS -->
          <div class="py-2">
            <button class="btn border text-purple bg-light" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"><b>+ Create new event</b></button>

            <div class="h-50 bg-secondary offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop"
              aria-labelledby="offcanvasTopLabel">
              <div class="offcanvas-header ">
                <h5 class="text-center w-100" id="offcanvasTopLabel">Create new event</h5>
                <button type="button" class="btn-close text-reset bg-danger p-2" data-bs-dismiss="offcanvas"
                  aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">

                <!-- FORM -->
                <form class="col-12 p-0 text-start" @submit.prevent="Function.sendForm()">
                  <div class="row m-0">

                    <div class="mb-4 col-3">
                      <input class="border-0 border-bottom form-control" :class="{ 'is-invalid': store.errors.title }"
                        type="text" name="title" id="title" placeholder="Title" v-model="store.title">
                      <p v-for="(error, index) in store.errors.title" :key="`message-error-${index}`"
                        class="invalid-feedback">
                        {{ error }}
                      </p>
                    </div>
                    <div class="mb-4 col-3">
                      <input class="border-0 border-bottom form-control" :class="{ 'is-invalid': store.errors.email }"
                        type="text" name="user_email" id="userEmail" placeholder="Email" v-model="store.userEmail">
                      <p v-for="(error, index) in store.errors.userEmail" :key="`message-error-${index}`"
                        class="invalid-feedback">
                        {{ error }}
                      </p>
                    </div>
                    <div class="mb-4 col-3">
                      <textarea class="border-0 border-bottom form-control"
                        :class="{ 'is-invalid': store.errors.message }" name="description" id="description" cols="30"
                        rows="1" placeholder="Description" v-model="store.description"></textarea>
                      <p v-for="(error, index) in store.errors.description" :key="`message-error-${index}`"
                        class="invalid-feedback">
                        {{ error }}
                      </p>
                    </div>
                    <div class="mb-4 col-3">
                      <input class="border-0 border-bottom form-control" :class="{ 'is-invalid': store.errors.name }"
                        type="text" name="location" id="location" placeholder="Location" v-model="store.location">
                      <p v-for="(error, index) in store.errors.location" :key="`message-error-${index}`"
                        class="invalid-feedback">
                        {{ error }}
                      </p>
                    </div>
                    <div class="mb-4 col-3">
                      <label for="startDate">Start Date</label><br>
                      <input type="date" class="border-0 border-bottom form-control me-3"
                        :class="{ 'is-invalid': store.errors.startDate }" name="start_date" id="startDate"
                        v-model="store.startDate">
                      <p v-for="(error, index) in store.errors.startDate" :key="`message-error-${index}`"
                        class="invalid-feedback">
                        {{ error }}
                      </p>
                    </div>
                    <div class="mb-4 col-3">
                      <label for="endDate">End Date</label><br>
                      <input type="date" class="border-0 border-bottom form-control me-3"
                        :class="{ 'is-invalid': store.errors.endDate }" name="end_date" id="endDate"
                        v-model="store.endDate">
                      <p v-for="(error, index) in store.errors.endDate" :key="`message-error-${index}`"
                        class="invalid-feedback">
                        {{ error }}
                      </p>
                    </div>
                    <div class="mb-4 col-3">
                      <label for="startHour">Start at</label><br>
                      <input type="time" class="border-0 border-bottom form-control me-3"
                        :class="{ 'is-invalid': store.errors.startHour }" name="start_hour" id="startHour"
                        v-model="store.startHour">
                      <p v-for="(error, index) in store.errors.startHour" :key="`message-error-${index}`"
                        class="invalid-feedback">
                        {{ error }}
                      </p>
                    </div>
                    <div class="mb-4 col-3">
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
                  <p class="text-light ms-3">(* all fields are mandatory)</p>

                  <div class="mt-2 text-center">
                    <button class="btn btn-lg btn-primary text-white" type="submit">{{ store.loading ?
                      'Sending...' : 'Send'
                      }}</button>
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div class="">
        <!-- CALENDAR -->
        <vue-cal :time-from="0 * 60" :time-to="24 * 60" :disable-views="['years', 'year']"
          :editable-events="{ title: true, drag: false, resize: false, delete: true, create: false, }"
          :events="Function.filterEvent()" :on-event-click="onEventClick"
          class="vuecal--full-height-delete calendar_table">
        </vue-cal>

        <!-- SINGLE V-CARD -->
        <v-dialog v-model="store.showDialog">
          <v-card class="w-50 text-center mx-auto rounded bg-secondary">
            <v-card-title>
              <h4 class="text-dark">{{ selectedEvent.title }}</h4>
            </v-card-title>
            <v-card-text class="text-dark">
              <p>Starts: {{ selectedEvent.start }}</p>
              <p>Ends: {{ selectedEvent.end }}</p>
              <p>{{ selectedEvent.content }}</p>
            </v-card-text>
            <v-card-actions>
              <span @click="store.showDialog = false" class="me-3"><i class="fa-solid fa-xmark text-dark"></i></span>
              <span @click="Function.deleteEvent(selectedEvent.id)"><i class="fa-solid fa-trash text-danger"></i></span>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>


    </div>
  </div>


</template>

<style scoped>
.calendar_table {
  background-color: black;
  color: white;
  height: 85vh;
  overflow: auto;
}

.calendar_table>>>.vuecal__event {
  background-color: purple;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
  padding: 0.5rem;

}

.calendar_table>>>.vuecal__cell {
  background-color: grey(242, 240, 238);
  border: 1px solid white;
  color: black;
  padding: 1rem;
  border-bottom: 1px solid white;

}

.my_vh {
  height: calc(100vh - 5rem);
}
</style>
