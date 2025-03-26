//Example Test Code
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav'; // Adjust the import based on your file structure

// Sample components for testing navigation
const Home = () => <h1>Home Page</h1>;
const CandidateSearch = () => <h1>Candidate Search Page</h1>;
const SavedCandidates = () => <h1>Saved Candidates Page</h1>;

describe('Nav Component', () => {
  test('navigates to the correct page when links are clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CandidateSearch" element={<CandidateSearch />} />
          <Route path="/SavedCandidates" element={<SavedCandidates />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the Home page is rendered by default
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();

    // Click on the "Candidate Search" link
    fireEvent.click(screen.getByText(/Candidate Search/i));
    expect(screen.getByText(/Candidate Search Page/i)).toBeInTheDocument();

    // Click on the "Saved Candidates" link
    fireEvent.click(screen.getByText(/Saved Candidates/i));
    expect(screen.getByText(/Saved Candidates Page/i)).toBeInTheDocument();
  });
});