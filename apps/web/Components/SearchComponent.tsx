"use client"
import React from 'react'
import { Input } from '../@/components/ui/input'
import { Button } from '../@/components/ui/button'

function SearchComponent() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
    <Input type="email" placeholder="Search Here..." className='h-10' />
    <Button className='bg-white' type="submit">Search</Button>
  </div>
  )
}

export default SearchComponent