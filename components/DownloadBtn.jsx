import { DownloadIcon } from "./Icons/Icons";

const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <button
      className="download-btn"
      
    >
      <DownloadIcon />
      Download
    </button>
  );
};

export default DownloadBtn;
