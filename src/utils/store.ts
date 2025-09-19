export default interface State {
  surname: string
  name: string
  birthDate: string
  pesel: string
  city: string
  street: string
  numberOfHouse: string
  postalCode: string
  phoneNumber: string
  email: string
  winter: boolean
  summer: boolean
  qualificationID: string
  proffesionName: string
  DateOfDeclaraion: string
  whichExam: {
    first: boolean
    anotherInWrittenPart: boolean
    anotherInPracticalPart: boolean
  }
  specialNeeds: boolean
  pedagogicalSupport: boolean
  healthCondition: boolean
  schoolEnded: boolean
}
