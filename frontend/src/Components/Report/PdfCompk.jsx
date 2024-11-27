import { useState } from "react";
import { Document, Page } from "react-pdf";


function PdfCompk(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, ] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
 
  return (
    <div className=" relative top-20 w-full">
      <p className="text-center">
        Page {pageNumber} of {numPages}
      </p>
      <div className="mx-auto w-full max-w-md">
        <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <Page
                  key={page}
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="w-full"
                />
              );
            })}
        </Document>
      </div>
      
    </div>
  );
}

export default PdfCompk;
