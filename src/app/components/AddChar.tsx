'use client';

import { FormEvent, useState } from 'react';

const AddChar = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    wizard: true,
    spells: [],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
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
            checked={formData.gender === 'male'}
            onChange={() => setFormData({ ...formData, gender: 'male' })}
            className="border-2 rounded-md mx-2"
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={() => setFormData({ ...formData, gender: 'female' })}
            className="border-2 rounded-md mx-2 cursor-pointer"
          />
          <label htmlFor="female">Female</label>
        </div>

        <label htmlFor="gender">Is a wizard?</label>
        <div>
          <input
            type="radio"
            id="wizard_true"
            name="wizard"
            value="true"
            checked={formData.wizard === true}
            onChange={() => setFormData({ ...formData, wizard: true })}
            className="border-2 rounded-md mx-2 cursor-pointer"
          />
          <label htmlFor="wizard_true">Wizard</label>
          <input
            type="radio"
            id="muggle"
            name="wizard"
            value="false"
            checked={formData.wizard === false}
            onChange={() => setFormData({ ...formData, wizard: false })}
            className="border-2 rounded-md mx-2 cursor-pointer"
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
