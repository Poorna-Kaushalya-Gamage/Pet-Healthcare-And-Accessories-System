import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { GiFallingEye } from 'react-icons/gi';

function Test1() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     
        
          <div  className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6" style={{ minHeight:'300px',width:'300px' }}>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold mb-2 h-12 overflow-hidden">Hello1</h2>
                  <p className="text-gray-600 text-sm overflow-hidden">How can i go</p>
                </div>
                <div className="flex justify-end gap-2">
                  <MdEdit  className="text-blue-500 cursor-pointer" />
                  <MdDelete  className="text-red-500 cursor-pointer" />
                  <GiFallingEye  className="text-purple-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

                  
          <div  className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6" style={{ minHeight:'300px',width:'300px' }}>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold mb-2 h-12 overflow-hidden">Hello2</h2>
                  <p className="text-gray-600 text-sm overflow-hidden">How can i go</p>
                </div>
                <div className="flex justify-end gap-2">
                  <MdEdit  className="text-blue-500 cursor-pointer" />
                  <MdDelete  className="text-red-500 cursor-pointer" />
                  <GiFallingEye  className="text-purple-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

                  
          <div  className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6" style={{ minHeight:'300px',width:'300px' }}>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold mb-2 h-12 overflow-hidden">Hello3</h2>
                  <p className="text-gray-600 text-sm overflow-hidden">How can i go</p>
                </div>
                <div className="flex justify-end gap-2">
                  <MdEdit  className="text-blue-500 cursor-pointer" />
                  <MdDelete  className="text-red-500 cursor-pointer" />
                  <GiFallingEye  className="text-purple-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>


                  
          <div  className="col-span-1 ">
            <div className="bg-white rounded-lg shadow p-4 mb-6" style={{ minHeight:'300px',width:'300px'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold mb-2 h-12 overflow-hidden">Hello4</h2>
                  <p className="text-gray-600 text-sm overflow-hidden">How can i go</p>
                </div>
                <div className="flex justify-end gap-2">
                  <MdEdit  className="text-blue-500 cursor-pointer" />
                  <MdDelete  className="text-red-500 cursor-pointer" />
                  <GiFallingEye  className="text-purple-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div  className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6" style={{ minHeight:'300px',width:'300px' }}>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold mb-2 h-12 overflow-hidden">Hello5</h2>
                  <p className="text-gray-600 text-sm overflow-hidden">How can i go</p>
                </div>
                <div className="flex justify-end gap-2">
                  <MdEdit  className="text-blue-500 cursor-pointer" />
                  <MdDelete  className="text-red-500 cursor-pointer" />
                  <GiFallingEye  className="text-purple-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        
      
    </div>
  );
}

export default Test1;
