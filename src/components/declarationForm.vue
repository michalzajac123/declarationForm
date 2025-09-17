<template>
  <form @submit.prevent="submitForm" class="declaration-form">
    <h1>Formularz deklaracji przystąpienia do egzaminu zawodowego</h1>
    <div>
      <label
        >Nazwisko:
        <input v-model="form.surname" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Imię:
        <input v-model="form.name" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Data urodzenia:
        <input v-model="form.birthDate" type="date" required />
      </label>
    </div>
    <div>
      <label
        >PESEL:
        <input v-model="form.pesel" type="text" maxlength="11" required />
      </label>
    </div>
    <div>
      <label
        >Miasto:
        <input v-model="form.city" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Ulica:
        <input v-model="form.street" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Nr domu:
        <input v-model="form.numberOfHouse" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Kod pocztowy:
        <input v-model="form.postalCode" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Telefon:
        <input v-model="form.phoneNumber" type="tel" required />
      </label>
    </div>
    <div>
      <label
        >Email:
        <input v-model="form.email" type="email" required />
      </label>
    </div>
    <div>
      <label><input v-model="form.winter" type="checkbox" /> Egzamin zimowy</label>
      <label><input v-model="form.summer" type="checkbox" /> Egzamin letni</label>
    </div>
    <div>
      <label
        >ID kwalifikacji:
        <input v-model="form.qualificationID" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Nazwa zawodu:
        <input v-model="form.proffesionName" type="text" required />
      </label>
    </div>
    <div>
      <label
        >Data złożenia deklaracji:
        <input v-model="form.DateOfDeclaraion" type="date" required />
      </label>
    </div>
    <fieldset>
      <legend>Rodzaj egzaminu</legend>
      <label><input v-model="form.whichExam.first" type="checkbox" /> pierwszy</label>
      <label
        ><input v-model="form.whichExam.anotherInWrittenPart" type="checkbox" /> kolejny w części
        pisemnej</label
      >
      <label
        ><input v-model="form.whichExam.anotherInPracticalPart" type="checkbox" /> kolejny w części
        praktycznej</label
      >
    </fieldset>
    <div>
      <label
        ><input v-model="form.specialNeeds" type="checkbox" /> Specjalne potrzeby edukacyjne</label
      >
    </div>
    <div>
      <label
        ><input v-model="form.pedagogicalSupport" type="checkbox" /> Wsparcie pedagogiczne</label
      >
    </div>
    <div>
      <label><input v-model="form.healthCondition" type="checkbox" /> Stan zdrowia</label>
    </div>
    <div>
      <label><input v-model="form.schoolEnded" type="checkbox" /> Ukończona szkoła</label>
    </div>
    <button type="submit">Wyślij</button>
  </form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  surname: '',
  name: '',
  birthDate: null as Date | null,
  pesel: '',
  city: '',
  street: '',
  numberOfHouse: '',
  postalCode: '',
  phoneNumber: '',
  email: '',
  winter: false,
  summer: false,
  qualificationID: '',
  proffesionName: '',
  DateOfDeclaraion: null as Date | null,
  whichExam: {
    first: false,
    anotherInWrittenPart: false,
    anotherInPracticalPart: false,
  },
  specialNeeds: false,
  pedagogicalSupport: false,
  healthCondition: false,
  schoolEnded: false,
})

function submitForm() {
  alert('Formularz został wysłany!')
  console.log(JSON.stringify(form, null, 2))
}
</script>
<style scoped>
.declaration-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.declaration-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}
.declaration-form input[type='text'],
.declaration-form input[type='email'],
.declaration-form input[type='tel'],
.declaration-form input[type='date'] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.25rem;
}
.declaration-form fieldset {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
}
.declaration-form button {
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}
.declaration-form button:hover {
  background: #0056b3;
}
</style>
