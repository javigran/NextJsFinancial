import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn } from 'next-auth/react';
const RegisterComponent = () => {
  const options = [
    {value: '', text: '--Choose an option--'},
    {value: 'CC', text: 'CC'},
    {value: 'CE', text: 'CE'},
    {value: 'TI', text: 'TI'},
  ];
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [selected, setSelected] = useState(options[0].value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/register', userData).then(response => 
      {
        if(response.status ==200){
          alert(response.statusText + "Usuario Creado Exitosamente.");
           signIn('credentials', {
            redirect: false,
            email: e.target.email.value,
            password: e.target.password.value,
          }).then(response2 => {
            console.log("Resultado" +response2);
            if(response2.ok) {
              console.log("Logged-in successfully going to protected");
              router.replace('/protected');
              return;
            }
            else{
              console.log("Else going to sigin");
              router.replace('/auth/sign-in');
          }

        });
         
      }
      //  console.log(response);
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
  const handleChangeSelect = (e) => {
    //console.log("cambie"+ e.target.name + "value"+ e.target.value);
    const { name, value } = e.target;
    setSelected(value);
    setUserData({...userData, [name]: selected });
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
      <label>
        Name:
        <input type="text" name="Name" onChange={e => handleChange(e)} />
      </label>
      <br/>
      <label>
        Tipo de Documento:
        <select name="type_cedula" value={selected} onChange={e=> handleChangeSelect(e)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      </label>
      <br/>
      <label>
        Cedula:
        <input type="number" name="no_cedula" onChange={e => handleChange(e)} />
      </label>
      <button>Register</button>
    </form>
  )
}

export default RegisterComponent;