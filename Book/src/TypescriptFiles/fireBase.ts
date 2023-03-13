// Import the functions you need from the SDKs you need

import axios from "axios";

export const config = {
  firebaseConfig: {
    apiKey: "AIzaSyBe_Xc8nXZZ83w8ZzGTog7IcwJobL_gYmA",
    authDomain: "bookshopping-d5cf0.firebaseapp.com",
    projectId: "bookshopping-d5cf0",
    storageBucket: "bookshopping-d5cf0.appspot.com",
    messagingSenderId: "1023982601414",
    appId: "1:1023982601414:web:19ec75af9ccb7b05a083c7",
  },
};

export async function changeInputFule(e: any, userID: number) {
  try {
    const data = new FormData();
    data.append("avatar", e[0]);
    const response = await axios.post(`http://localhost:8080/image/`, data, {
      headers: { Authorization: userID },
    });
    if (response.status !== 200) {
      alert(response.status);
      localStorage.removeItem("uuid");
      localStorage.removeItem("userID");
      return (window.location.href = "/login");
    } else {
      const blob = new Blob([e], { type: "image" });
      const url = URL.createObjectURL(blob);
      return url
    }
  } catch (error: any) {
    alert(error.message);
    localStorage.removeItem("uuid");
    localStorage.removeItem("userID");
    return (window.location.href = "/login");
  }
}
