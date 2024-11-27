import { useEffect, useState } from "react";
import axios from "axios";
/*import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString(); */

function Pdfreports() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  /*const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  /*useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };*/


  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);
  
    const result = await axios.post(
      "http://localhost:5000/uploadfile", formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
  };
   /* if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  };*/
  return (
    <div className="App">
  <form className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
    <h4 className="text-lg font-semibold mb-4">Upload PDF in React</h4>
    <div className="mb-4">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}

      />
    </div>
    <div className="mb-4">
      <input
        type="file"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        accept="application/pdf"
        required
       onChange={(e) => setFile(e.target.files[0])}

      />
    </div>
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
      type="submit"
    >
      Submit
    </button>
  </form>
</div>
  )

}
export default Pdfreports;