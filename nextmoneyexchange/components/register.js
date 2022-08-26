import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn } from 'next-auth/react';
const RegisterComponent = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/register', userData).then(response => 
      {
        if(response.status ==200){
          alert(response.statusText + "Usuario Creado Exitosamente.");
          router.replace('/auth/sign-in');
        }
      8//  console.log(response);
       // console.log(JSON.stringify(response.data));
       // if(response.data)

      }).catch(e => {
      alert(e.response.data);
    });
     // router.replace('/protected');
  //   console.log(res);

     //console.log(res.status);
     // if(res.ok){
       // alert('Usuario Registrado Exitosamente');
     // }
  
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" onChange={e => handleChange(e)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" onChange={e => handleChange(e)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" onChange={e => handleChange(e)} />
      </label>
      <br />
      <button>Register</button>
    </form>
  )
}

export default RegisterComponent;