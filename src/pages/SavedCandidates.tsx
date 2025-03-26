import { useState, useEffect } from 'react';
import type Candidate from '../interfaces/Candidate.interface'

const SavedCandidates = (): JSX.Element => {
    const [allCandidateList, setAllCandidateList] = useState<Candidate[]> ([]);
    const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number> (0);

   //when page reloads, the information should persist 
      
    useEffect (() => {
      const potentialCandidate = localStorage.getItem('savedCandidates');
      console.log(potentialCandidate)
      if (potentialCandidate) {
        setAllCandidateList(JSON.parse(potentialCandidate));
      }
    }, []);

    useEffect(() => {
      if (allCandidateList.length > 0) {
      localStorage.setItem('savedCandidates', JSON.stringify(allCandidateList));
      }
    }, [allCandidateList]);

    const currentCandidate = allCandidateList[currentCandidateIndex];

    
    const nextCandidate = () => {
      //next candidate's information should be displayed without saving the current candidate
      if (currentCandidateIndex < allCandidateList.length - 1) {
        setCurrentCandidateIndex(currentCandidateIndex + 1);
      }
    };

    // const prevCandidate = () => {
    //   if (currentCandidateIndex > 0) {
    //     setCurrentCandidateIndex(currentCandidateIndex - 1);
    //   }
    // }

  return (
    <>
      <h1>Potential Candidates</h1>
{currentCandidate ? (
  <div>
    <ul>
    <img 
    src={currentCandidate?.avatar_url}
    alt={`${currentCandidate.login}'s avatar`} />
      <li>{currentCandidate.name}</li>
      <li>Username:{currentCandidate.login}</li>
      <li>Location:{currentCandidate.location}</li>
      <li>Email:{currentCandidate.email}</li>
      <li>Company:{currentCandidate.company}</li>
    <a href={currentCandidate.html_url}>Profile Link</a>
    <button onClick={nextCandidate} disabled={currentCandidateIndex === 0}> - </button>
    </ul>
  </div>
) : (
   //no candidates added - appropriate message should be shown
  <p>No candidates have been added.</p>
)}
    </>
  );
};

export default SavedCandidates;
