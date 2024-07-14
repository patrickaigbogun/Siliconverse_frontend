import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import countryOptions from '../utils/country-options';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyEmail: '',
    companyPhone: '',
    organizationName: '',
    location: '',
    password: '',
    confirmPassword: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const {
      companyEmail: email,
      password,
      firstName,
      lastName,
      companyPhone,
      organizationName,
      location,
      state,
    } = formData;
    // Form submission logic
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          companyPhone: companyPhone,
          organizationName: organizationName,
          location: location,
          stateOfResdidence: state,
        });
      }
      console.log('Company successfully registered');
      toast.success('Registered Company successfully 🎉', {
        position: 'top-center',
      });
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, { position: 'bottom-center' });
    }

    console.log('Form data submitted:', formData);
  };

  return (
    <div className='talent-form relative bg-white/10 flex-col-reverse lg:flex-row gap-5 font-roboto'>
      <form
        onSubmit={handleSubmit}
        className='flex-shrink-0'>
        <h2>Company Signup</h2>

        <div className='w-full flex flex-col md:flex-row justify-between gap-3 md:gap-8'>
          <div className='w-full'>
            <label htmlFor='firstName'>First name:</label>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full'>
            <label htmlFor='lastName'>Last name:</label>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between gap-3 md:gap-8'>
          <div className='w-full'>
            <label htmlFor='companyEmail'>Organization Email:</label>
            <input
              type='email'
              name='companyEmail'
              placeholder='Company Email'
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full'>
            <label htmlFor='tel'>Organization phone number:</label>
            <input
              type='tel'
              name='companyPhone'
              placeholder='Company Phone Number'
              value={formData.companyPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between gap-3 md:gap-8'>
          <div className='w-full'>
            <label htmlFor='organizationName'>Organization name:</label>
            <input
              type='text'
              name='organizationName'
              placeholder='Company name'
              value={formData.organizationName}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full'>
            <label htmlFor='location'>Current Location</label>
            <select
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              required>
              <option
                value=''
                disabled>
                Current Location (Country)
              </option>
              {countryOptions.map((country) => (
                <option
                  key={country}
                  value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='py-3'>
          <label htmlFor='state'>State located:</label>
          <input
            type='text'
            name='state'
            placeholder='State'
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between gap-3 md:gap-8'>
          <div className='w-full'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full'>
            <label htmlFor='confirmPassword'>Confirm password:</label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <button
            className='talent-signup-button'
            type='submit'>
            Sign Up
          </button>
          <p>
            By signing up, you accept our{' '}
            <span className='text-primaryColor text-base md:text-lg drop-shadow-md font-roboto'>
              terms and conditions
            </span>
          </p>
          <p>
            Already have an account?
            <Link to='/login'>
              <span className='text-primaryColor text-base md:text-lg drop-shadow-md font-roboto'>
                Log in
              </span>
            </Link>
          </p>
        </div>
      </form>
      <div className='rounded-lg text-sm md:text-base border border-primaryColor p-4 text-white mx-auto flex flex-col gap-4 items-center justify-center'>
        <h3 className='text-center font-roboto font-bold text-xl md:text-xl'>
          Welcome to Siliconverse
        </h3>
        <p>
          Siliconverse is a tech space for tech talents, who wish to look for
          internship, jobs and further their knowledge on the tech space. <br />{' '}
          Siliconverse is a tech space for tech talents, who wish to look for
          internship, jobs and further their knowledge on the tech space.
        </p>
      </div>
    </div>
  );
};

export default CompanyForm;
