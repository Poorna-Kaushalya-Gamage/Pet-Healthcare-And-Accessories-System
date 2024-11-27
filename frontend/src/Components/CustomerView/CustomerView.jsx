import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../nav/nav user";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faBox,
  faTruck,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const CustomerView = () => {
  const { userEmail } = useParams();
  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingByEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/tracking/email/${userEmail}`
        );
        setTracking(response.data.tracking);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trackings:", error);
        setLoading(false);
      }
    };

    fetchTrackingByEmail();
  }, [userEmail]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "notyet":
        return { color: "red", icon: faBan };
      case "packed":
        return { color: "blue", icon: faBox };
      case "dispatched":
        return { color: "blue", icon: faTruck };
      case "complete":
        return { color: "green", icon: faCheck };
      default:
        return { color: "gray", icon: faClock };
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "100px",
            fontFamily: "initial",
            fontWeight: "bold",
          }}
        >
          <h1>
            <b>Tracking Details</b>
          </h1>
        </div>

        {tracking.length > 0 ? (
          <div style={{ position: "absolute", top: "150px" }}>
            {tracking.map((track) => (
              <div
                key={track._id}
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                  padding: "40px",
                  borderRadius: "8px",
                  margin: "20px",
                  width: "900px",
                  height: "370px",
                }}
              >
                <br />
                <div style={{ position: "absolute", left: "220px" }}>
                  <h5>
                    <strong>Email:</strong> {track.email}
                  </h5>
                  <h5>
                    <strong>Tracking Id:</strong>{" "}
                    <span style={{ color: "#808080" }}>{track._id}</span>
                  </h5>

                  <div
                    className="grid grid-cols-3 gap-3 p-4"
                    style={{ width: "500px" }}
                  >
                    <StatusBlock
                      status={track.status1}
                      date={track.date1}
                      getStatusStyle={getStatusStyle}
                    />
                    <StatusBlock
                      status={track.status2}
                      date={track.date2}
                      getStatusStyle={getStatusStyle}
                    />
                    <StatusBlock
                      status={track.status3}
                      date={track.date3}
                      getStatusStyle={getStatusStyle}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ position: "absolute", top: "350px" }}>
            <h4>
              No tracking details found for this email{" "}
              <span style={{ color: "#DB4035" }}>{userEmail}</span>
            </h4>
          </div>
        )}
      </div>

      <div style={{position:"absolute", top:"1200px", left:"1300px"}}>
        <Link to={"/adddelayform"}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
            Add delay
          </button>
        </Link>
      </div>
    </div>
  );
};

function StatusBlock({ status, date, getStatusStyle }) {
  const { color, icon } = getStatusStyle(status);

  return (
    <div
      className={`flex flex-col items-center bg-${color}-100 p-4 rounded-md`}
    >
      <div className="text-sm font-semibold text-gray-600">{status}</div>
      <div className="text-gray-800">{date}</div>
      <button
        className={`mt-2 rounded-md px-4 py-2 text-white bg-${color}-500`}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
}

export default CustomerView;
