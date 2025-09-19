<template>
  <form @submit.prevent="submitForm" class="declaration-form">
    <h1>Formularz deklaracji przystąpienia do egzaminu zawodowego</h1>

    <div class="form-section">
      <h2>Dane osobowe</h2>
      <div class="form-row">
        <div class="form-field">
          <label>
            Nazwisko:
            <input v-model="form.surname" type="text" :class="{ error: formError.surname }" />
          </label>
        </div>
        <div class="form-field">
          <label>
            Imię:
            <input v-model="form.name" type="text" :class="{ error: formError.name }" />
          </label>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label>
            Data urodzenia:
            <input v-model="form.birthDate" type="date" :class="{ error: formError.birthDate }" />
          </label>
        </div>
        <div class="form-field">
          <label>
            PESEL:
            <input
              v-model="form.pesel"
              type="text"
              maxlength="11"
              :class="{ error: formError.pesel }"
            />
          </label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h2>Adres zamieszkania</h2>
      <div class="form-row">
        <div class="form-field">
          <label>
            Miejscowość:
            <input v-model="form.city" type="text" :class="{ error: formError.city }" />
          </label>
        </div>
        <div class="form-field">
          <label>
            Ulica:
            <input v-model="form.street" type="text" :class="{ error: formError.street }" />
          </label>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label>
            Nr domu:
            <input
              v-model="form.numberOfHouse"
              type="text"
              :class="{ error: formError.numberOfHouse }"
            />
          </label>
        </div>
        <div class="form-field">
          <label>
            Kod pocztowy:
            <input v-model="form.postalCode" type="text" :class="{ error: formError.postalCode }" />
          </label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h2>Dane kontaktowe</h2>
      <div class="form-row">
        <div class="form-field">
          <label>
            Telefon:
            <input
              v-model="form.phoneNumber"
              type="tel"
              :class="{ error: formError.phoneNumber }"
            />
          </label>
        </div>
        <div class="form-field">
          <label>
            Email:
            <input v-model="form.email" type="email" :class="{ error: formError.email }" />
          </label>
        </div>
      </div>
    </div>

    <div :class="{ error: formError.termOfExam }" class="form-section">
      <h2>Termin egzaminu</h2>
      <div class="checkbox-group">
        <label for="winter" class="checkbox-label">
          <input id="winter" v-model="form.winter" name="examTerm" type="radio" />
          <span class="checkbox-text">Egzamin zimowy</span>
        </label>
        <label for="summer" class="checkbox-label">
          <input id="summer" v-model="form.summer" name="examTerm" type="radio" />
          <span class="checkbox-text">Egzamin letni</span>
        </label>
      </div>
    </div>

    <div class="form-section">
      <h2>Informacje o kwalifikacji</h2>
      <div class="form-row">
        <div class="form-field">
          <label>
            ID kwalifikacji:
            <input
              v-model="form.qualificationID"
              type="text"
              :class="{ error: formError.qualificationID }"
            />
          </label>
        </div>
        <div class="form-field">
          <label>
            Nazwa zawodu:
            <input
              v-model="form.proffesionName"
              type="text"
              :class="{ error: formError.proffesionName }"
            />
          </label>
        </div>
      </div>

      <div class="form-field">
        <label>
          Data złożenia deklaracji:
          <input
            v-model="form.DateOfDeclaraion"
            type="date"
            :class="{ error: formError.DateOfDeclaraion }"
          />
        </label>
      </div>
    </div>

    <fieldset class="exam-type-fieldset" :class="{ error: formError.whichExam }">
      <legend>Rodzaj egzaminu</legend>
      <div class="checkbox-group">
        <label class="checkbox-label" for="whichTime">
          <input id="whichTime" v-model="form.whichExam.first" name="whichTime" type="radio" />
          <span class="checkbox-text">Pierwszy</span>
        </label>
        <label class="checkbox-label" for="whichTime2">
          <input
            id="whichTime2"
            v-model="form.whichExam.anotherInWrittenPart"
            name="whichTime"
            type="radio"
          />
          <span class="checkbox-text">Kolejny w części pisemnej</span>
        </label>
        <label class="checkbox-label" for="whichTime3">
          <input
            id="whichTime3"
            v-model="form.whichExam.anotherInPracticalPart"
            name="whichTime"
            type="radio"
          />
          <span class="checkbox-text">Kolejny w części praktycznej</span>
        </label>
      </div>
    </fieldset>

    <div class="form-section">
      <h2>Dokumenty załącznikowe</h2>
      <div class="checkbox-group">
        <span class="checkbox-text">Do deklaracji dołączam:</span>
        <label class="checkbox-label">
          <input v-model="form.pedagogicalSupport" type="checkbox" />
          <span class="checkbox-text"
            >Orzeczenie/opinię publicznej poradni psychologiczno-pedagogicznej (w przypadku
            występowania dysfunkcji)*</span
          >
        </label>
        <label class="checkbox-label">
          <input v-model="form.healthCondition" type="checkbox" />
          <span class="checkbox-text"
            >Zaświadczenie o stanie zdrowia wydane przez lekarza* (w przypadku choroby lub
            niesprawności czasowej)*</span
          >
        </label>
        <label class="checkbox-label">
          <input v-model="form.schoolEnded" type="checkbox" />
          <span class="checkbox-text">Świadectwo ukończenia szkoły*</span>
        </label>
      </div>
    </div>
    <span class="errorSpan" v-if="!formIsValid">W deklaracji występują błędy</span>
    <button type="submit" class="submit-button">Wydrukuj deklaracje</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type State from '@/utils/store'
import pdfCreator from '@/utils/pdfCreator'
const form = ref<State>({
  surname: '',
  name: '',
  birthDate: '',
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
  DateOfDeclaraion: '',
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

const formError = ref({
  surname: false,
  name: false,
  birthDate: false,
  pesel: false,
  city: false,
  street: false,
  numberOfHouse: false,
  postalCode: false,
  phoneNumber: false,
  email: false,
  termOfExam: false,
  qualificationID: false,
  proffesionName: false,
  DateOfDeclaraion: false,
  whichExam: false,
  specialNeeds: false,
  pedagogicalSupport: false,
  healthCondition: false,
  schoolEnded: false,
})
const formIsValid = ref(true)
const submitForm = async () => {
  formIsValid.value = !validateForm()
  if (formIsValid.value) {
    await pdfCreator(form.value)
  }
}
const validateForm = (): boolean => {
  let hasError = false
  const regex = new RegExp('^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$')
  const peselRegex = new RegExp('^[0-9]{11}$')
  if (form.value.surname === '' || !regex.test(form.value.surname)) {
    formError.value.surname = true
    hasError = true
  } else {
    formError.value.surname = false
  }
  if (form.value.name === '' || !regex.test(form.value.name)) {
    formError.value.name = true
    hasError = true
  } else {
    formError.value.name = false
  }
  if (form.value.birthDate === '') {
    formError.value.birthDate = true
    hasError = true
  } else {
    formError.value.birthDate = false
  }
  if (!peselRegex.test(form.value.pesel)) {
    formError.value.pesel = true
    hasError = true
  } else {
    formError.value.pesel = false
  }
  if (form.value.city === '' || !regex.test(form.value.city)) {
    formError.value.city = true
    hasError = true
  } else {
    formError.value.city = false
  }
  if (form.value.street === '' || !regex.test(form.value.street)) {
    formError.value.street = true
    hasError = true
  } else {
    formError.value.street = false
  }
  if (form.value.numberOfHouse === '') {
    formError.value.numberOfHouse = true
    hasError = true
  } else {
    formError.value.numberOfHouse = false
  }
  if (form.value.postalCode === '') {
    formError.value.postalCode = true
    hasError = true
  } else {
    formError.value.postalCode = false
  }
  if (form.value.phoneNumber === '') {
    formError.value.phoneNumber = true
    hasError = true
  } else {
    formError.value.phoneNumber = false
  }
  if (form.value.email === '' || !form.value.email.includes('@')) {
    formError.value.email = true
    hasError = true
  } else {
    formError.value.email = false
  }
  if (!form.value.winter && !form.value.summer) {
    formError.value.termOfExam = true
    hasError = true
  } else {
    formError.value.termOfExam = false
  }
  if (form.value.qualificationID === '') {
    formError.value.qualificationID = true
    hasError = true
  } else {
    formError.value.qualificationID = false
  }
  if (form.value.proffesionName === '') {
    formError.value.proffesionName = true
    hasError = true
  } else {
    formError.value.proffesionName = false
  }
  if (form.value.DateOfDeclaraion === '') {
    formError.value.DateOfDeclaraion = true
    hasError = true
  } else {
    formError.value.DateOfDeclaraion = false
  }
  if (
    !form.value.whichExam.first &&
    !form.value.whichExam.anotherInWrittenPart &&
    !form.value.whichExam.anotherInPracticalPart
  ) {
    formError.value.whichExam = true
    hasError = true
  } else {
    formError.value.whichExam = false
  }

  return hasError
}
</script>

<style scoped>
.declaration-form {
  max-width: 800px;
  margin: 2rem auto;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

.declaration-form h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  border-bottom: 3px solid #3498db;
  padding-bottom: 1rem;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.form-section h2 {
  color: #34495e;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-field input[type='text'],
.form-field input[type='email'],
.form-field input[type='tel'],
.form-field input[type='date'] {
  padding: 0.75rem;
  border: 2px solid #e0e6ed;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #ffffff;
}

.form-field input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.checkbox-label:hover {
  background-color: rgba(52, 152, 219, 0.05);
}

.checkbox-label input[type='checkbox'] {
  margin: 0;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3498db;
}

.checkbox-text {
  color: #2c3e50;
  font-weight: 400;
}

.exam-type-fieldset {
  border: 2px solid #e0e6ed;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: #f8f9fa;
}

.exam-type-fieldset legend {
  font-weight: 600;
  color: #2c3e50;
  padding: 0 1rem;
  background: #ffffff;
  border-radius: 4px;
}

.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-button:hover {
  background: linear-gradient(135deg, #2980b9, #1f6391);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
}

.submit-button:active {
  transform: translateY(0);
}
.error {
  border: 2px solid rgb(255, 34, 34) !important;
}
.errorSpan {
  color: rgb(255, 34, 34);
  font-weight: 600;
  display: block;
  margin-bottom: 1rem;
  text-align: center;
}
@media (max-width: 768px) {
  .declaration-form {
    margin: 1rem;
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .declaration-form h1 {
    font-size: 1.5rem;
  }
}
</style>
