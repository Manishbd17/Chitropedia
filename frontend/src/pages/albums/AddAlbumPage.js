import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import { fetchPostDataWithAuth } from 'client/client';

const AddAlbumPage = () => {
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    name : '', description: '',
  }); 

  const [errors,setErrors] = useState({
    name: '', description: '',
  }); 

  const handleInputChange = (e) => {
    const {name,value} = e.target; 
    setFormData( (prevData)=> ({
        ...prevData,
        [name]: value, 
    }));
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    //Validation
    let isValid=true; 
    const newErrors = {name:'',description:''}; 
    if(!formData.name.trim()) {
        newErrors.name = 'Name is required';
        isValid=false; 
    }
    if(!formData.description.trim()) {
        newErrors.description = 'Description is required'; 
        isValid=false; 
    }
    setErrors(newErrors); 

    //If form is valid, proceed with further actions
    if(isValid) {
        const payload = {
            name : formData.name,
            description : formData.description,
        }; 
        fetchPostDataWithAuth("/albums/add",payload)
        .then( (response)=> {
            console.log(response); 
        }).catch( (error)=>{
            console.error("Login error",error); 
        }); 
        console.log('Form Submitted', payload);
        navigate('/');  
    }
  }; 

  useEffect(()=>{
    const isLoggedIn = localStorage.getItem('token'); 
    if(!isLoggedIn) {
      navigate('/login'); 
      window.location.reload(); 
    }
  },[]); 

  return (
    <form onSubmit={handleSubmit}>
      <TextField
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
        />
      <TextField
          fullWidth
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}
          margin="normal"
       />
      <Button type="submit" variant="contained" color="primary" >
          Add Album
      </Button>
    </form>
  );

};

export default AddAlbumPage;
