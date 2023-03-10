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
