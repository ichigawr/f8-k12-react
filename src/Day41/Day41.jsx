import { useState } from "react";

const genders = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
];

const courses = [
  { title: "HTML", value: "html" },
  { title: "CSS", value: "css" },
  { title: "Javascript", value: "javascript" },
];

function Day41() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    courses: [],
  });

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    if (!e.target.checked) {
      setFormValues({
        ...formValues,
        courses: formValues.courses.filter(
          (course) => course !== e.target.value
        ),
      });
    } else {
      setFormValues({
        ...formValues,
        courses: [...formValues.courses, e.target.value],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {genders.map(({ title, value }) => (
          <label key={value}>
            <input
              type="radio"
              name="gender"
              value={value}
              checked={value === formValues.gender}
              onChange={handleInputChange}
            />
            <span>{title}</span>
          </label>
        ))}
        {courses.map(({ title, value }) => (
          <label key={value}>
            <input
              type="checkbox"
              name="courses"
              value={value}
              checked={formValues.courses.includes(value)}
              onChange={handleCheckboxChange}
            />
            <span>{title}</span>
          </label>
        ))}
        <input
          type="text"
          value={formValues.firstName}
          name="firstName"
          placeholder="Enter your first name..."
          onChange={handleInputChange}
        />
        <input
          type="text"
          value={formValues.lastName}
          name="lastName"
          placeholder="Enter your last name..."
          onChange={handleInputChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Day41;
