export interface Participant {
  id: string
  name: string
  dob: string 
  email: string
  phone: string 
}

export interface FormErrors {
  name?: string
  dob?: string
  email?: string
  phone?: string
}
