import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <header
    id='root_bar'
    className='md:flex md:flex-row w-full border-b border-gray-700'
  >
    <div
      id='item_left_tool_bar'
      className='md:flex md:flex-row md:w-3/12 md:justify-start md:items-center md:bg-orange-200 '
    >
      <h3 className='p-2 m-3 md:scroll-m-20 md:text-2xl md:font-semibold md:tracking-tight '>shop.kenovo.by</h3>
    </div>
    <div
      id='item_center_tool_bar'
      className='md:flex md:flex-row md:w-6/12 md:justify-center md:items-center md:bg-orange-400'
    >
      center
    </div>
    <div
      id='item_right_tool_bar'
      className='md:flex md:flex-row md:w-3/12 md:justify-end md:items-center md:bg-orange-600'
    >
      <Button variant="default" className='p-2 m-3'>Sign in</Button>
      <Button variant="secondary" className='p-2 m-3'>Sign up</Button>

    </div>
  </header>
  )
}

export default Header
