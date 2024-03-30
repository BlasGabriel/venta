"use client";

import React from 'react'
import ButtonDE from '../components/ButtonDE'
import Link from 'next/link'
import { useUser } from '../context/UserContext'

const Home = () => {
  const { user } = useUser();
  console.log(user)
  return (
    <div>
        <h1 className="text-3xl font-bold underline">
        Home
      </h1>
   

    </div>
  )
}

export default Home