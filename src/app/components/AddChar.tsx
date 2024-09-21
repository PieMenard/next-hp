'use client';

import { FormEvent, useState } from 'react';

const AddChar = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    wizard: 'wizard',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-[400px] border py-2 pb-5 rounded-lg flex flex-col justify-center">
      <h1 className="text-center font-bold">Add a New Character</h1>
      <form className="flex flex-col text-center" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          type="text"
          value={formData.name}
          name="name"
          className="border-2 rounded-md mx-2 px-2"
        />
        <label htmlFor="gender">Gender</label>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            className="border-2 rounded-md mx-2"
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            className="border-2 rounded-md mx-2 cursor-pointer"
          />
          <label htmlFor="female">Female</label>
        </div>

        <label htmlFor="gender">Is a wizard?</label>
        <div>
          <input
            type="radio"
            id="wizard"
            name="wizard"
            value="wizard"
            className="border-2 rounded-md mx-2 cursor-pointer"
          />
          <label htmlFor="wizard">Wizard</label>
          <input
            type="radio"
            id="muggle"
            name="wizard"
            value="muggle"
            className="border-2 rounded-md mx-2"
          />
          <label htmlFor="muggle">Muggle</label>
        </div>
        <button
          type="submit"
          className="bg-teal-700 text-white rounded-md w-[100px] mx-auto mt-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddChar;
