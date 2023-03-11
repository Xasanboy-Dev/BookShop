export interface Book {
  authorID: number;
  createdDate: string;
  desc: string;
  id: number;
  page: number;
  title: string;
  userID: number;
  authorName: string;
  imageURL: string
}

export interface Author {
  name: string;
  id: number;
  createdUser: number;
}

export interface User {
  id:number
  name:string
  surname:string
  email:string 
  password:string
  SavedBooks:number[]
  SavedAuthor:number[]
  imageURL:string
}