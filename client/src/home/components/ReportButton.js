import './ReportButton.css';
import { useNavigate } from 'react-router-dom';


const ReportButton = () => {
const navigate = useNavigate();

    const handleClick = () => {
        console.log("report button clicked")
      navigate("/report");

    }

  return (
    <button className="report_button" onClick={handleClick}>
        Damage or loss report
        </button>
  );
};

export default ReportButton;
