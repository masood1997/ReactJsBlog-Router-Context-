import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12 overflow-y-auto">
                      <img
                          src="../../../public/pexels-ian-beckley-2440024.jpg"
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                      Proprietary of Choudhary Enterprises Ltd
                      </h2>
                      <p className="mt-6 text-gray-600">
                          This blog is developed by <Link className="hover:text-orange-700" to="https://github.com/masood1997">Masood Rehman</Link>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default About