import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile(props) {
  const [profileData, setProfileData] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const email = localStorage.getItem('email');

  function getUsers() {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_name: res.name,
          profile_email: res.email,
          about_me: res.about
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const handleCodeSubmit = async () => {
    try {
      const response = await axios.post("YOUR_OPENAI_API_ENDPOINT", {
        code: codeSnippet,
        // Add other necessary parameters for the OpenAI API
      });

      if (response.data.summary) {
        setSummary(response.data.summary);
      } else {
        alert("Failed to get code summary");
      }
    } catch (error) {
      console.error("Code Summary Error:", error);
      alert("An error occurred while summarizing the code.");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-50">
        <div className="col col-lg-12">
          <div className="card mb-3">
            {profileData && (
              <div className="row g-0">
                <div className="col-md-4 bg-c-lite-green text-center text-white">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" className="img-fluid my-5" width="150" alt="Profile Avatar" />
                  <h5>{profileData.profile_name}</h5>
                  <p>{profileData.profile_email}</p>
                  <i className="far fa-edit mb-5"></i>
                </div>

                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Your profile details:</h6>

                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{profileData.profile_email}</p>
                      </div>
                     
                      <div className="col-6 mb-3">
                        <h6>About Me</h6>
                        <p className="text-muted">{profileData.about_me}</p>
                      </div>
                    </div>

                    {/* Chatbot Section */}
                    <div className="mb-3">
                      <label htmlFor="codeSnippet" className="form-label">Enter Code Snippet:</label>
                      <textarea
                        className="form-control"
                        id="codeSnippet"
                        rows="3"
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                      ></textarea>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={handleCodeSubmit}>
                      Get Code Summary
                    </button>

                    {summary && (
                      <div className="mt-3">
                        <h6>Code Summary:</h6>
                        <p>{summary}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
