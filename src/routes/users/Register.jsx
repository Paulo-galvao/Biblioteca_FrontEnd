import React from 'react'
import { MdMenuBook } from 'react-icons/md';
import { Link } from 'react-router';
import RegisterForm from '../../components/form/RegisterForm.jsx';

function Register() {
  return (
    <div className="h-dvh flex items-center">
      <div className="w-full">
        <div className="flex w-full justify-center mb-4 ">
          <Link to="/">
            <MdMenuBook className="text-5xl" />
          </Link>
        </div>
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-6">
          Crie uma conta
        </h2>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register;
