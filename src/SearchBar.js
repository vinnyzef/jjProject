import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Search, XCircleFill } from 'react-bootstrap-icons';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">
        <Search />
      </InputGroup.Text>
      <FormControl
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="basic-addon1"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <Button variant="outline-secondary" onClick={clearSearch}>
          <XCircleFill />
        </Button>
      )}
    </InputGroup>
  );
}

export default SearchBar;
