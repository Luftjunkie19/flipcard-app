import axios from "axios";

import { addToDatabase } from "./Database";

export const signInWithCredentials = async (
  email,
  password,
  nickname,
  image
) => {
  const credentials = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFCcktCSx1UFusE79oPSCgDsvR1jQdDjo",
    {
      email: email,
      password: password,
      displayName: nickname,
      returnSecureToken: true,
    }
  );

  await addToDatabase(
    {
      displayName: credentials.data.displayName,
      photoURL: image,
      email: credentials.data.email,
      id: credentials.data.localId,
    },
    "users",
    credentials.data.localId
  );

  return credentials;
};

export const loginToApp = async (email, password) => {
  const userCredetials = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFCcktCSx1UFusE79oPSCgDsvR1jQdDjo",
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  return userCredetials;
};
