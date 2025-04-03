import { useState, useEffect } from 'react';
import type Candidate from '../interfaces/Candidate.interface'

const SavedCandidates = (): JSX.Element => {
    const [allCandidateList, setAllCandidateList] = useState<Candidate[]> ([]);
    const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number> (0);
       const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
          name: "",
          login: "",
          location: "",
          avatar_url: "",
          email: "",
          html_url: "",
          company: "",
          bio: "",
        });

        //when page reloads, the information should persist 
    useEffect (() => {
      const potentialCandidates = localStorage.getItem('savedCandidates');
      const candidates: Candidate[] = potentialCandidates ? JSON.parse(potentialCandidates):[];
      
      setAllCandidateList(candidates);
        
      if (candidates.length > 0) {
        setCurrentCandidate(candidates[0])
    }
    }, []);

    useEffect(() => {
      if (allCandidateList.length > 0) {
    setCurrentCandidate(allCandidateList[currentCandidateIndex]);
      }
    }, [currentCandidateIndex, allCandidateList]);

    
    const nextCandidate = () => {
      //next candidate's information should be displayed without saving the current candidate
      if (currentCandidateIndex < allCandidateList.length - 1) {
        setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
      }
    };

  return (
    <div>
      <h1> Potential Candidates </h1>

      {allCandidateList.length === 0 ? (
        <p> No available candidates to view </p>
      ) : (
<table className='table'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        {currentCandidate && (
          <tr>
            <td>
              <img
              src={currentCandidate.avatar_url}
            alt={`${currentCandidate.login}'s avatar`}
          />
      </td>
    <td>
      <strong>{currentCandidate.name}</strong> <br />
      <em>({currentCandidate.login})</em>
      </td>
      <td>
        <a href={`Email ${currentCandidate.email}`}>
          {currentCandidate.email}
        </a>
      </td>
      <td>{currentCandidate.company}</td>
      <td>{currentCandidate.bio}</td>
      <td>
        <button onClick={nextCandidate} disabled={currentCandidateIndex >= allCandidateList.length - 1}> - </button>
      </td>
      </tr>
  )}
  </tbody>
  </table>
      )}
      </div>
  );
};

export default SavedCandidates;
