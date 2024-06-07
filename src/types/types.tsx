export interface FormData {
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
  favColor: string;
  birthDate?: Date;
  favFruit: string;
  errors: {
    firstName: string;
    lastName: string;
    agreeToTerms: string;
    favColor: string;
    birthDate?: string;
    favFruit: string;
  };
}
