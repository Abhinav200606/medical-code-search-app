import React, {useState} from 'react'

const SearchBar = () => {
   const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const fetchICD = async (query) => {
      if (!query) return;
      setLoading(true);
      setError("");
  
      try {
        const res = await fetch(
          `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${query}
`
        );
        const data = await res.json();
        setResults(data[3] || []);
      } catch {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      const value = e.target.value;
      setSearch(value);
      if (value.length > 2) fetchICD(value);
      else setResults([]);
    };
  return (
    <div className="card shadow p-4 mx-auto bg-light mt-3 rounded-4" style={{maxWidth:"600px",}}>
      <h1 className="text-center mb-4">
        <i className="bi bi-heart-pulse me-3 text-primary"></i>ICD-10 Code Lookup
        </h1>
        <div className="input-group mb-3 ">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>
            <input
            className="form-control border-start-0"
            type='text'
            placeholder='Search ICD Codes and diagnosis...'
            value={search}
          onChange={handleChange}
            />
        </div>
        {loading && <p className="text-center text-muted">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <ul className="list-group">
        {results.map(([code, desc]) => (
          <li
            key={code}
            className="list-group-item border-0"
            style={{
                cursor: "pointer",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "transparent",
        transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#f8f9fa";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
          >
            <span className="me-2">•</span>
            <strong className="">{code}</strong> 
            <span className="text-muted"> — {desc}</span>
            {/* <span className="text-secondary small ms-3">{desc}</span> */}
            
          </li>
        ))}

        {!loading && results.length === 0 && search.length > 2 && (
          <p className="text-center text-muted mt-3">
            No matching ICD codes found.
          </p>
        )}
      </ul>
    </div>
  )
}

export default SearchBar
