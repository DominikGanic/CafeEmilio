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
  "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";

// Actions
const Send = async () => {
  Loading.value = true;
  Sent.value = false;
  Error.value = undefined;

  const Response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": APIKey,
    },
    body: JSON.stringify({
      to: [{ email: "dominik@leetlabs.de", name: "Dominik Ganic" }],
      sender: {
        name: "Café Emilio",
        email: "kontakt@cafe-emilio.com",
      },
      templateId: 1,
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
  <div class="flex flex-col items-center justify-center w-screen p-16 overflow-y-scroll gap-y-16 bg-cafe-primary h-dvh">
    <div
      v-if="Error"
      class="w-full max-w-3xl p-12 mx-auto space-y-4 text-center bg-red-100 rounded-xl"
    >
      <div class="text-2xl font-bold text-red-500">
        Fehler beim versenden der E-Mail!
      </div>
      <div calss="space-y-2">
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
      class="w-full max-w-3xl p-12 mx-auto space-y-4 text-center bg-green-100 rounded-xl"
    >
      <div class="text-2xl font-bold text-green-500">
        Angebot wurde versendet!
      </div>

      <div>Das Angebot wurde erfolgreich an den Kunden versendet.</div>
    </div>

    <div class="mx-auto space-y-2 text-center">
      <div class="text-4xl font-bold text-white">
        Café Emilio Angebotsversand
      </div>
      <div class="text-lg text-white/50">
        Ganz bequem und einfach ein Angebot an Interessenten von Café Emilio
        versenden.
      </div>
    </div>

    <div class="w-full max-w-3xl p-16 mx-auto space-y-8 bg-white rounded-xl">
      <div class="grid grid-cols-2 gap-8">
        <div class="space-y-3">
          <label for="receiver_email" class="block text-xl font-bold"
            >E-Mail Adresse</label
          >
          <input
            v-model="ReceiverEmail"
            id="receiver_email"
            name="receiver_email"
            type="email"
            class="w-full p-6 px-8 text-lg font-semibold transition-all border-none outline-none bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
            placeholder="max@mustermann.de"
          />
        </div>

        <div class="space-y-3">
          <label for="receiver_fullname" class="block text-xl font-bold"
            >Vor- und Nachname</label
          >
          <input
            v-model="ReceiverFullname"
            id="receiver_fullname"
            name="receiver_fullname"
            type="text"
            class="w-full p-6 px-8 text-lg font-semibold transition-all border-none outline-none bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
            placeholder="Max Mustermann"
          />
        </div>
      </div>

      <div class="space-y-3">
        <label for="salutation" class="block text-xl font-bold">Anrede</label>
        <input
          v-model="Salutation"
          id="salutation"
          name="salutation"
          type="text"
          class="w-full p-6 px-8 text-lg font-semibold transition-all border-none outline-none bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="Sehr geehrte Damen und Herren"
        />
      </div>

      <div class="space-y-3">
        <label for="count" class="block text-xl font-bold"
          >Anzahl der Kaffeemaschinen</label
        >
        <input
          v-model="Count"
          id="count"
          name="count"
          type="text"
          class="w-full p-6 px-8 text-lg font-semibold transition-all border-none outline-none bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="Eine"
        />
      </div>

      <div class="space-y-3">
        <label for="duration" class="block text-xl font-bold"
          >Vertragslaufzeit (in Monaten)</label
        >
        <input
          v-model="Duration"
          id="duration"
          name="duration"
          type="text"
          class="w-full p-6 px-8 text-lg font-semibold transition-all border-none outline-none bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="60"
        />
      </div>

      <div class="space-y-3">
        <label for="price" class="block text-xl font-bold"
          >Monatlicher Mietpreis</label
        >
        <input
          v-model="Price"
          id="price"
          name="price"
          type="text"
          class="w-full p-6 px-8 text-lg font-semibold transition-all border-none outline-none bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
          placeholder="99,00"
        />
      </div>

      <button
        @click="Send"
        type="submit"
        class="block w-full p-6 px-8 text-xl font-bold text-center text-white transition-all cursor-pointer bg-cafe-primary hover:bg-cafe-primary-600 active:bg-cafe-primary-700 rounded-xl"
      >
        Angebot versenden
      </button>
    </div>
  </div>
</template>
