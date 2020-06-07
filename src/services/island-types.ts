export interface Category {
  category: string;
  _id : string;
}

export interface Island {
  name: string;
  description: string;
  category: Category;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}

export interface RawIsland {
  name: string;
  description: string;
  category: string;
  member: string;
}
