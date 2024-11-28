import React, { useEffect, useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import { v4 as uuidv4 } from "uuid";
// import AvatarImg from "../../assets/image/avatar.png";
import { COUNRTRIES, GENDER } from "../../static/index";

const Crad = () => {
  // useState - controlled form
  const [username, setUsername] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // useRef - uncontrolled form
  const fname = useRef(null);
  const lname = useRef(null);
  const password = useRef(null);
  const birthDate = useRef(null);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || [] // locatStorage dan ma'lumotlarni o'qib olish
  );
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem("data", JSON.stringify(data)); // localStorage ga ma'lumotlarni saqlash
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      // update
      let updatedUser = {
        id: edit.id,
        fname: fname.current.value,
        lname: lname.current.value,
        username,
        password: password.current.value,
        country: selectedCountry,
        gender: selectedGender,
        birthDate: birthDate.current.value,
        phoneNumber,
      };
      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? updatedUser : item))
      );
      setEdit(null);
      //   const index = data.findIndex((item) => item.id === data.id);
      //   data.splice(index, 1, updatedUser);
      //   setData(data);
    } else {
      // create
      const newUser = {
        id: uuidv4(),
        fname: fname.current.value,
        lname: lname.current.value,
        username,
        password: password.current.value,
        country: selectedCountry,
        gender: selectedGender,
        birthDate: birthDate.current.value,
        phoneNumber,
      };
      setData((prev) => [...prev, newUser]);
      //   localStorage.setItem("data", JSON.stringify([...data, newUser])); // localStorage ga malumotlarni saqlash
    }
    setUsername(""); // input maydonlarini tozalash
    setSelectedCountry("");
    setSelectedGender("");
    setPhoneNumber("");

    fname.current.value = "";
    lname.current.value = "";
    password.current.value = "";
    birthDate.current.value = "";
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setUsername(item.username);
    setSelectedCountry(item.country);
    setSelectedGender(item.country);
    setPhoneNumber(item.phoneNumber);
    fname.current.value = item.fname;
    lname.current.value = item.lname;
    password.current.value = item.password;
    birthDate.current.value = item.birthDate;
    setEdit(item);
  };

  return (
    <div className="flex gap-5">
      <form
        className="w-80 p-5 bg-slate-200 h-screen"
        action="#"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full h-10 px-3 mb-3"
          ref={fname}
          type="text"
          placeholder="Firstname"
        />
        <input
          className="w-full h-10 px-3 mb-3"
          ref={lname}
          type="text"
          placeholder="Lastname"
        />
        <input
          className="w-full h-10 px-3 mb-3"
          value={username}
          required
          unique
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          className="w-full h-10 px-3 mb-3"
          ref={password}
          required
          minLength={6}
          maxLength={20}
          type="password"
          placeholder="Password"
        />
        <select
          required
          value={selectedCountry}
          onChange={(event) => setSelectedCountry(event.target.value)}
          className="w-full h-10 px-3 mb-3 outline-none"
        >
          <option value="" disabled>
            Select your country
          </option>
          {COUNRTRIES.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <select
          required
          value={selectedGender}
          onChange={(event) => setSelectedGender(event.target.value)}
          className="w-full h-10 px-3 mb-3 outline-none"
        >
          <option value="" disabled>
            Select your gender
          </option>
          {GENDER.map((gender) => (
            <option key={gender.id} value={gender.name}>
              {gender.name}
            </option>
          ))}
        </select>
        <input className="w-full h-10 px-3 mb-3" ref={birthDate} type="date" />
        <PatternFormat
          className="w-full h-10 px-3 mb-3"
          value={phoneNumber}
          required
          unique
          onChange={(event) => setPhoneNumber(event.target.value)}
          type="tel"
          format="+998 (##) ### ## ##"
          allowEmptyFormatting
          mask="_"
        />
        <button className="w-full h-10 px-3 mb-3 bg-blue-400">Create</button>
      </form>

      <div className="flex-1 flex gap-3 flex-wrap items-start content-start py-5">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-72 p-3 shadow text-center flex flex-col gap-2"
          >
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto">
              {/* <img
                className="w-35 h-35 bg-slate-200 rounded-full mx-auto"
                src={AvatarImg}
                alt="avatar image"
              /> */}
            </div>
            <h3>{item.fname}</h3>
            <h3>{item.lname}</h3>
            <h3>{item.username}</h3>
            <h3>{item.password}</h3>
            <h3>{item.country}</h3>
            <h3>{item.gender}</h3>
            <h3>{item.birthDate}</h3>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 p-1 rounded text-white"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="bg-green-500 p-1 rounded text-white"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crad;
