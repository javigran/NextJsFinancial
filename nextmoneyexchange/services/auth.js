
export async function signIn({ email, password }) {

  try {
    const res = await axios.post(`${strapiUrl}/api/auth/local`, {
      identifier: email,
      password,
    });
    if (response && response.data) {
      return res.data;
    }
  }  catch (error) {
    throw new Error('Invalid email or password')
  }
  
}