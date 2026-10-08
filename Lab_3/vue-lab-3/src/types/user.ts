export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserLocation {
  street: {
    number: number
    name: string
  }
  city: string
  state: string
  country: string
  postcode: number | string
  timezone: {
    offset: string
    description: string
  }
}

export interface UserDob {
  date: string
  age: number
}

export interface User {
  id: number
  gender: 'male' | 'female'
  name: UserName
  location: UserLocation
  email: string
  dob: UserDob
  phone: string
  cell: string
  picture: string
  hobbies: string[]
  details: string
}
