<script setup lang="ts">
// Vue
import { ref } from "vue";

// Properties
const ReceiverEmail = ref();
const ReceiverFullname = ref();
const Salutation = ref("Sehr geehrte Damen und Herren");
const Loading = ref(false);
const Error = ref();
const Sent = ref(false);
const APIKey =
  "eGtleXNpYi1mNmQwOWNlODAxMGU1YTI0OTUyYTIzZGNjNTJmNDQzODg5Nzg3ODg0YmU0YTIwYTUyMzlhMjRkNjkwZjJkMmUzLWdZb01hV1ZhMzY5V09HUUo=";

// Validations
import { configure, useForm, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  receiver_email: Yup.string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    .required("Bitte geben Sie eine E-Mail-Adresse ein."),
  receiver_fullname: Yup.string().required(
    "Bitte geben Sie den vollständigen Namen ein."
  ),
  salutation: Yup.string().required("Bitte geben Sie eine Anrede ein."),
});

configure({
  validateOnChange: true,
  validateOnInput: true,
});

const Form = useForm({
  validationSchema: ValidationSchema,
});

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
      to: [{ email: ReceiverEmail.value, name: ReceiverFullname.value }],
      sender: {
        name: "Café Emilio",
        email: "kontakt@cafe-emilio.com",
      },
      templateId: 4,
      params: {
        SALUTATION: Salutation.value,
        DURATION: "36",
        PRICE: "99,00",
      },
    }),
  });

  if (!Response.ok) {
    Error.value = await Response.json();
  } else {
    Sent.value = true;

    ReceiverEmail.value = undefined;
    ReceiverFullname.value = undefined;
    Salutation.value = undefined;

    Form.resetForm({
      values: {
        receiver_email: undefined,
        receiver_fullname: undefined,
        salutation: undefined,
      },
    });
  }

  Loading.value = false;
};
</script>

<template>
  <form
    class="grid w-screen p-6 overflow-y-scroll place-items-center sm:p-16 bg-cafe-primary h-dvh"
  >
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
            Übermittlung aufgetreten ist. Bitte kontaktieren Sie hierfür
            LeetLabs unter
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

        <div class="text-sm sm:text-base">
          Das Angebot wurde erfolgreich an den Kunden versendet.
        </div>
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

      <div
        class="w-full max-w-3xl p-8 mx-auto space-y-10 bg-white sm:p-16 sm:space-y-16 rounded-xl"
      >
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-1 sm:gap-16">
          <div class="space-y-4">
            <div>
              <label
                for="receiver_email"
                class="block text-lg font-bold sm:text-xl"
                >E-Mail Adresse</label
              >
              <div class="text-xs font-medium sm:text-sm text-zinc-500">
                Dies ist die E-Mail-Adresse des Kunden. An diese Adresse wird
                das Angebot versendet.
              </div>
            </div>

            <Field
              v-model="ReceiverEmail"
              id="receiver_email"
              name="receiver_email"
              type="email"
              class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
              placeholder="max@mustermann.de"
            />

            <ErrorMessage name="receiver_email" v-slot="{ message }">
              <div class="w-full text-xs font-semibold text-red-500 sm:text-sm">
                {{ message }}
              </div>
            </ErrorMessage>
          </div>

          <div class="space-y-4">
            <div>
              <label
                for="receiver_fullname"
                class="block text-lg font-bold sm:text-xl"
                >Vor- und Nachname</label
              >
              <div class="text-xs font-medium sm:text-sm text-zinc-500">
                Der vollständige Name des Kunden. Dieser erscheint im
                E-Mail-Postfach des Empfängers.
              </div>
            </div>

            <Field
              v-model="ReceiverFullname"
              id="receiver_fullname"
              name="receiver_fullname"
              type="text"
              class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
              placeholder="Max Mustermann"
            />

            <ErrorMessage name="receiver_fullname" v-slot="{ message }">
              <div class="w-full text-xs font-semibold text-red-500 sm:text-sm">
                {{ message }}
              </div>
            </ErrorMessage>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label for="salutation" class="block text-lg font-bold sm:text-xl"
              >Anrede</label
            >
            <div class="text-xs font-medium sm:text-sm text-zinc-500">
              Wählen Sie die passende Anrede. Diese wird in der Angebots-E-Mail
              ganz oben verwendet.
            </div>
          </div>

          <Field
            v-model="Salutation"
            id="salutation"
            name="salutation"
            type="text"
            class="w-full p-4 px-6 text-base font-semibold transition-all border-none outline-none sm:p-6 sm:px-8 sm:text-lg bg-cafe-primary-100 hover:bg-cafe-primary-200 focus:bg-cafe-primary text-cafe-primary focus:text-white rounded-xl"
            placeholder="Sehr geehrte Damen und Herren"
          />

          <ErrorMessage name="salutation" v-slot="{ message }">
            <div class="w-full text-xs font-semibold text-red-500 sm:text-sm">
              {{ message }}
            </div>
          </ErrorMessage>
        </div>

        <button
          @click.stop.prevent="Send"
          :disabled="!Form.meta.value.valid"
          type="submit"
          class="block w-full p-4 px-6 text-lg font-bold text-center text-white transition-all cursor-pointer sm:p-6 sm:px-8 sm:text-xl bg-cafe-primary hover:bg-cafe-primary-600 active:bg-cafe-primary-700 rounded-xl disabled:opacity-50"
        >
          Angebot versenden
        </button>
      </div>
    </div>
  </form>
</template>
