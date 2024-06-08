export class NinValidation {
  nin: string = "";
  firstname: string = "";
  lastname: string = "";
  middleName: string = "";
  dateOfBirth: string = "";
}

export class SubmitOnboarding {
  nin: string = "";
  otpCode: string = "";
  phoneNumber: string = "";
  email: string = "";
  gender: string = "";
  religion: string = "";
  houseOwner: boolean = false;
  lga: string = "";
  maritalStatus: string = "";
  politicalView: string = "";
  convicted: boolean = false;
  placeOfBirth: string = "";
  address: string = "";
  annualRent: number = 0;
  crimeType: string = "";
  specifyCrimeType: string = "";
  spouseList: SpouseList[] = [];
  childList: ChildList[] = [];
}

export class SpouseList {
  name: string = "";
  phoneNumber: string = "";
}

export class ChildList {
  name: string = "";
  age: number = 0;
  inSchool: boolean = false;
  phoneNumber: string = "";
  schoolName: string = "";
}
