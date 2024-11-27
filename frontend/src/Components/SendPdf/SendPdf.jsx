import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfDelCom from "./PdfDelCom";
import { pdfjs } from 'react-pdf';
import Nav from "../Nav copy/Nav";
import Sidebar from '../sidebarmovi/Sidebar';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function SendPdf() {
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState("");
  const [allPdf, setAllPdf] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/getFile");
    console.log(result.data.data);
    setAllPdf(result.data.data);
  }

  const submitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    try {
      const result = await axios.post("http://localhost:5000/uploadfile",
        formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(result);
      if (result.data.status === 200) {
        alert("Upload Success")
        getPdf();
      } else {
        alert("Upload Error");
      }
    } catch (error) {
      console.error("Error Uploading : " + error.message);
      alert("Error Uploading : ");
    }
  };

  const showPdf = (pdf) => {
    setPDFFile(`http://localhost:5000/files/${pdf}`);
  };

  return (
   
      <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-60 pt-20 overflow-x-auto">
      <div className='grid grid-cols-0' >
        <div className='col-span-2 bg-customBlue h-full p-4 w-43 fixed top-12 left-0 '>
          <Sidebar/>
        </div >
           
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Send PDF</h1>
        <form onSubmit={submitPdf} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">PDF Title</label>
            <input id="title" required type="text" onChange={(e) => setTitle(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3" placeholder="Enter PDF title..." />
          </div>
          <div className="mb-6">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Select PDF File</label>
            <input id="file" required type="file" accept="application/pdf" onChange={(e) => saveFile(e.target.files[0])} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3" />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">PDF Details</h2>
          {allPdf && allPdf.map((data) => (
            <div key={data._id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Title: {data.title}</h3>
              <button onClick={() => showPdf(data.pdf)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Show PDF</button>
            </div>
          ))}
        </div>
      </div>
      <PdfDelCom pdfFile={pdfFile} />
    </div>
       
   
    </section>
      
    </React.Fragment>
  );
}

export default SendPdf;

