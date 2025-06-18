<script setup lang="ts">
// Vue
import { ref } from "vue";

// Properties
const ReceiverEmail = ref();
const ReceiverFullname = ref();
const Salutation = ref();
const Count = ref();
const Duration = ref();
const Price = ref();
const Loading = ref(false);
const Error = ref();
const Sent = ref(false);
const APIKey =
  "eGtleXNpYi1mNmQwOWNlODAxMGU1YTI0OTUyYTIzZGNjNTJmNDQzODg5Nzg3ODg0YmU0YTIwYTUyMzlhMjRkNjkwZjJkMmUzLWdZb01hV1ZhMzY5V09HUUo=";

// Actions
const Send = async () => {
  Loading.value = true;
  Sent.value = false;
  Error.value = undefined;

  const Response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": atob(APIKey),
    },
    body: JSON.stringify({
      to: [{ email: "dominik@leetlabs.de", name: "Dominik Ganic" }],
      sender: {
        name: "Café Emilio",
        email: "kontakt@cafe-emilio.com",
      },
      templateId: 4,
      params: {
        SALUTATION: Salutation.value,
        COUNT: Count.value,
        DURATION: Duration.value,
        PRICE: Price.value,
      },
    }),
  });

  if (!Response.ok) {
    Error.value = await Response.json();
  } else {
    Sent.value = true;
  }

  Loading.value = false;
};
</script>

<template>
  <div class="grid w-screen p-6 overflow-y-scroll place-items-center sm:p-16 bg-cafe-primary h-dvh">
    <div class="space-y-8 sm:space-y-16">
        <div
      v-if="Error"
      class="w-full max-w-3xl p-6 mx-auto space-y-4 text-center bg-red-100 sm:p-12 rounded-xl"
    >
      <div class="text-lg font-bold text-red-500 sm:text-2xl">
        Fehler beim versenden der E-Mail!
      </div>
      <div class="space-y-2 text-sm sm:text-base">
        <div>
          Das Angebot konnte nicht versendet werden, da ein Fehler bei der
          Übermittlung aufgetreten ist. Bitte kontaktieren Sie hierfür LeetLabs
          unter
          <a class="font-bold" href="mailto:info@leetlabs.de"
            >info@leetlabs.de</a
          >
          mit folgender Fehlermeldung:
        </div>
        <div class="text-red-500">{{ Error }}</div>
      </div>
    </div>
    <div
      v-else-if="Sent"
      class="w-full max-w-3xl p-6 mx-auto space-y-4 text-center bg-green-100 sm:p-12 rounded-xl"
    >
      <div class="text-lg font-bold text-green-500 sm:text-2xl">
        Angebot wurde versendet!
      </div>

      <div class="text-sm sm:text-base">Das Angebot wurde erfolgreich an den Kunden versendet.</div>
    </div>

    <div class="mx-auto space-y-2 text-center">
      <div class="text-2xl font-bold text-white sm:text-4xl">
        Café Emilio Angebotsversand
      </div>
      <div class="text-sm sm:text-lg text-white/50">
        Ganz bequem und einfach ein Angebot an Interessenten von Café Emilio
        versenden.
      </div>
    </div>

    <div class="w-full max-w-3xl p-8 mx-auto space-y-6 bg-white sm:p-16 sm:space-y-8 rounded-xl">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <div class="space-y-3">
          <label for="receiver_email" class="block text-base font-bold sm:text-xl"
            >E-Mail Adresse</label
          >
          <input
            v-model="ReceiverEmail"
            id="receiver_email"
            name="receiver_email"
            type="email"
            class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
            placeholder="max@mustermann.de"
          />
        </div>

        <div class="space-y-3">
          <label for="receiver_fullname" class="block text-base font-bold sm:text-xl"
            >Vor- und Nachname</label
          >
          <input
            v-model="ReceiverFullname"
            id="receiver_fullname"
            name="receiver_fullname"
            type="text"
            class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
            placeholder="Max Mustermann"
          />
        </div>
      </div>

      <div class="space-y-3">
        <label for="salutation" class="block text-base font-bold sm:text-xl">Anrede</label>
        <input
          v-model="Salutation"
          id="salutation"
          name="salutation"
          type="text"
            class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="Sehr geehrte Damen und Herren"
        />
      </div>

      <div class="space-y-3">
        <label for="count" class="block text-base font-bold sm:text-xl"
          >Anzahl der Kaffeemaschinen</label
        >
        <input
          v-model="Count"
          id="count"
          name="count"
          type="text"
            class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="Eine"
        />
      </div>

      <div class="space-y-3">
        <label for="duration" class="block text-base font-bold sm:text-xl"
          >Vertragslaufzeit (in Monaten)</label
        >
        <input
          v-model="Duration"
          id="duration"
          name="duration"
          type="text"
            class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="60"
        />
      </div>

      <div class="space-y-3">
        <label for="price" class="block text-base font-bold sm:text-xl"
          >Monatlicher Mietpreis</label
        >
        <input
          v-model="Price"
          id="price"
          name="price"
          type="text"
            class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="99,00"
        />
      </div>

      <button
        @click="Send"
        type="submit"
        class="block w-full p-4 px-6 text-lg font-bold text-center text-white transition-all cursor-pointer sm:p-6 sm:px-8 sm:text-xl bg-cafe-primary hover:bg-cafe-primary-600 active:bg-cafe-primary-700 rounded-xl"
      >
        Angebot versenden
      </button>
    </div>
    </div>
  </div>
</template>
