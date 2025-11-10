import React from 'react'
import MenuList from './Menu'
import { Link } from 'react-router'

const Sidebar = () => {
  return (
    <div>
      <div className="shadow-sm  shadow-info  drawer-open h-full ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
        
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className='py-2 hover:text-info '>

          </div>
          <MenuList />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
