import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import type Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  //setting values for current and all users
  const [allUsersList, setAllUsersList] = useState<Candidate[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  // const [loading, setLoading] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<Candidate>({
    name: "",
    login: "",
    location: "",
    avatar_url: "",
    email: "",
    html_url: "",
    company: "",
    bio: "",
  });

  //getting potential candidates to local storage
  const saveToPotential = () => {
    const loadCandidate = localStorage.getItem("savedCandidates");
    const parsePotentialCandidate: Candidate[] = loadCandidate
      ? JSON.parse(loadCandidate)
      : [];
    console.log(parsePotentialCandidate);

    if (
      currentUser &&
      !parsePotentialCandidate.some(
        (candidate) => candidate.login === currentUser.login
      )
    ) {
      parsePotentialCandidate.push(currentUser);
    }
    localStorage.setItem(
      "savedCandidates",
      JSON.stringify(parsePotentialCandidate)
    );

    //next candidate's information should be displayed without saving the current candidate
    if (currentUserIndex < allUsersList.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  //fetching data for all users
  useEffect(() => {
    async function search() {
      if (allUsersList.length === 0) {
        const data = await searchGithub();
        setAllUsersList(data);
      }
      //need to add error handling
    }
    search();
  }, []);

  //fetching data for current user
  useEffect(() => {
    async function searchCurrentUser() {
      if (allUsersList.length > 0 && currentUserIndex < allUsersList.length) {
        const username = allUsersList[currentUserIndex]?.login as string;
        if (!username) return;
        const data = await searchGithubUser(username);
        setCurrentUser(data);
      }
      //need to add error handling
    }
    searchCurrentUser();
  }, [currentUserIndex, allUsersList]);

  // const prevCandidate = () => {
  //   if (currentCandidateIndex > 0) {
  //     setCurrentCandidateIndex(currentCandidateIndex - 1);
  // };

  //return this data to user
  return (
    <div>
      <h1>CandidateSearch</h1>
      {currentUser ? (
        <div>
          <img
            src={currentUser?.avatar_url}
            alt={`${currentUser.login}'s avatar`}
          />
          <h2>{currentUser.login}</h2>
          <h3>Location:{currentUser.location || "No location available"}</h3>
          <h3>Email:{currentUser.email || "No email available"}</h3>
          <h3>Company:{currentUser.company || "No company available"}</h3>
          <p>Bio:{currentUser.bio || "No bio available"}</p>
          <button
            onClick={() => setCurrentUserIndex(currentUserIndex - 1)}
            disabled={currentUserIndex === 0}
          >
            {" "}
            -{" "}
          </button>
          <button
            onClick={saveToPotential}
            disabled={currentUserIndex >= allUsersList.length + 1}
          >
            {" "}
            +{" "}
          </button>
        </div>
      ) : (
        <p> No candidate info available </p>
      )}
    </div>
  );
};

export default CandidateSearch;
