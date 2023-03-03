import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from 'axios';
const strapiUrl = process.env.STRAPI_URL;


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials,req) {

        const { email, password } = credentials;
   
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const res = await axios.post(`${strapiUrl}/api/auth/local`, {
            identifier: email,
            password: password,
          });
          if (res && res.data) {
            const token = { id:  res.data.user.id,  name: res.data.user.nombre, email:  res.data.user.id, };
            
            //console.log("Response"+ JSON.stringify(res.data.user));
            //console.log("Token"+  JSON.stringify(token));
            const resp1 = JSON.stringify(res.data.user);
            const resp2 = JSON.stringify(token);
            return {...res.data.user,...token};
          }
          else {
            // If you return null or false then the credentials will be rejected
            return null;
          }
          //var concat = {...user,jwt};
        
          
        } catch (error) {
          // console.log("Error"+ error);
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],

  callbacks: {
    session: async (session, user) => {
     // console.log(session);

      return session;
    
    },
  },
});