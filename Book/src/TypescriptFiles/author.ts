import { async } from "@firebase/util";
import axios from "axios";
import { Author } from "../modules/module";

export async function getAuthor() {
  const response = await axios.get(`http://localhost:8080/author`);
  return response.data.authors;
}

export async function deleteAuthor(author: Author, userID: number) {
  if (author.createdUser !== userID) {
    alert("You cann't delete someone's author!");
    return;
  } else {
    const response = await axios.delete(
      `http://localhost:8080/author/${userID}`,
      { headers: { Authorization: author.id } }
    );
    alert(response.data.message);
    window.location.href = "/author";
  }
}

export async function createAuthor(
  authorName: string,
  userID: number,
  wasBorn: string,
  diedDate: string
) {
  try {
    let born = new Date(wasBorn);
    let died = new Date(diedDate);
    if (!diedDate && born) {
      const response = await axios.post(
        `http://localhost:8080/author/${userID}`,
        {
          name: authorName,
          wasBorn,
        }
      );
      if (response.status == 201) {
        alert("Added succesfully!");
        return;
      }
      alert("Your author is not added!");
      return false;
    }
    if (born < died) {
      const response = await axios.post(
        `http://localhost:8080/author/${userID}`,
        {
          name: authorName,
          wasBorn,
          wasDied: diedDate,
        }
      );
      if (response.status !== 201) {
        alert("Your author is not added!");
        return false;
      } else {
        alert("Added succesfully!");
        window.location.href = '/author'
        return 
      }
    } else {
      alert("You entered wrond date!");
      return false;
    }
  } catch (error: any) {
    alert(`Your author did not added!`);
    return false;
  }
}
