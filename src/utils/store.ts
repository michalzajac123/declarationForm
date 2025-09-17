export interface State {
    surname: string;
    name: string;
    birthDate: Date | null;
    pesel: string;
    city: string;
    street: string;
    numberOfHouse: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
    winter:boolean
    summer:boolean
    qualificationID:string
    proffesionName:string
    DateOfDeclaraion: Date
    whichExam: {
        first: boolean;
        anotherInWrittenPart: boolean;
        anotherInPracticalPart: boolean;
    };
    specialNeeds: boolean;
    pedagogicalSupport: boolean;
    healthCondition: boolean;
    schoolEnded: boolean;
}