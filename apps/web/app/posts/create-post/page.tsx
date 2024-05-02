

"use client"

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input} from '../../../@/components/ui/input';
import { Label } from '../../../@/components/ui/label';
import { Button } from '../../../@/components/ui/button';
import axios from 'axios';

interface ImageFormData {
  image: FileList; 
}

const ImageUploadComponent: React.FC = () => {
  const { register, handleSubmit  } = useForm<ImageFormData>(); 
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating , setCreating] = useState(false)
 

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
       if(file) {
        const objectURL = URL.createObjectURL(file);
        setPreviewImage(objectURL);
       }
    }
  };

  const onSubmit : SubmitHandler<ImageFormData> = async (data) => {

    try {
      setCreating(true)
      const imageFile = data.image?.[0]; // Ensure data.image is not undefined before accessing its first element
      if (!imageFile) {
        throw new Error('No image selected');
      }

      const formData = new FormData();
      formData.append('post', imageFile); // Append the image file to FormData
      
      const res = await axios.post(
        `/api/post/create-post?orgID=65fba7ef90dfb092289923fd`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Response:', res.data);
      setCreating(false)
    } catch (error : any) {
      setCreating(false)
      setError(error.message);
    }
    
    
  };

  return (
    <div className=' lg:h-[500px]'>
     
      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-4'>

      <div className="grid w-full max-w-sm items-center gap-1.5 ">
         <Label className=' text-white' htmlFor="picture">Add Image</Label>
         <Input type="file" accept="image/*" {...register('image')} onChange={handleImageChange} />
       </div>
       
     
       <div className=' lg:flex lg:flex-row lg:justify-center border border-white  h-[200px] lg:h-[300px] w-full lg:w-1/2 '>
       {previewImage && (
            <img
              src={previewImage} 
              alt="Selected"
              className=' h-full w-full '
            />
        
        )}
       </div>
       <div className=' '>
       <Button className=' bg-white lg:w-1/3 ' type="submit">{creating ? "Creating" : "Create"}</Button>
       </div>
      </form>
    </div>
  );
};

export default ImageUploadComponent;


