import React, { useState, useEffect } from "react";
import Nav from "../Navp/Nav";
import Sidebar from "../Sidebar/Sidebar.jsx";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfCompk from "./PdfCompk.jsx";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Report() {
  const [title, setTitle] = useState();
  const [file, saveFile] = useState();
  const [allPdf, setAllPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/getpfiles");
    console.log(result.data.data);
    setAllPdf(result.data.data);
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadpfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);

      if (result.data.status === 200) {
        alert("Upload Success");
        getPdf();
      } else {
        alert("Upload Error");
      }
    } catch (error) {
      console.error("Error Uploading :" + error.message);
      alert("Error Uploading :");
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:8070/files/${pdf}`, "_blank", "noreferrer");//
    
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
  return (
    <React.Fragment>
      <section>
        <div>
          <Nav />
        </div>
      </section>

      <section className="pl-64 pt-20  ">
        <div className="grid grid-cols-12">
          <div className="col-span-2 bg-customBlue h-full p-4 w-50 fixed top-12 left-0">
            <Sidebar />
          </div>
          <div className="mt-8 mx-auto max-w-md col-span-10">
            <form onSubmit={submitPdf} className="bg-white p-6 rounded shadow-md">
              <label className="block mb-2">Report Title</label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded p-2 mb-4"
                placeholder="Enter report title"
              />
              <label className="block mb-2">Select Report File</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => saveFile(e.target.files[0])}
                required
                className="block w-full border border-gray-300 rounded p-2 mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="mt-8 mx-auto max-w-md text-center col-span-10">
            <h4 className="mb-4">Uploaded PDF:</h4>
            <div className="flex flex-wrap">
            {allPdf &&
              allPdf.map((data) => (
                <div className="flex items-center justify-between mb-4">
                <div key={data.id}  className="mb-4 mr-4" >
                  <h6 className="mb-2">Title: {data.title}</h6>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => showPdf(data.pdf)}
                  >
                    Show PDF
                  </button>
                </div>
                </div>
              ))}
              </div>
          </div>
         <div className="col-span-8">
          <PdfCompk pdfFile={pdfFile} />
          </div>
        </div>
      </section>
      
    </React.Fragment>
  );
}

export default Report;
