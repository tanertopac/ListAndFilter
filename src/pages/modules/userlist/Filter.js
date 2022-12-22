import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Filter = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [filterOptions, setFilterOptions] = useState({ name: '', age: '', isAvailable: false, companyName: '' })
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const name = searchParams.get('name');
        const age = searchParams.get('age');
        const isAvailable = searchParams.get('isAvailable');
        const companyName = searchParams.get('companyName');

        setFilterOptions({ name, age, isAvailable: isAvailable === 'false' || !isAvailable ? false : true, companyName })
    }, [searchParams])


    const fetchCompanyList = async () => {
        await fetch('http://localhost:3001/api/companies').then(res => res.json()).then(response => setCompanies(response)).catch(err => console.log(err));
    }

    useEffect(() => {
        fetchCompanyList()
    }, [])

    const handleSubmitFilter = () => {
        const url = new URL("http://localhost:3000"),
            params = filterOptions
        Object.keys(params).filter(key => !!params[key]).forEach(key => url.searchParams.append(key, params[key]))
        navigate(url.search)
    }

    const handleFilterOptionsChange = (field, value) => {
        setFilterOptions({ ...filterOptions, [field]: value })
    }


    return (
        <div style={{ display: "flex", width: "100%" }}>
            <input placeholder='Name' value={filterOptions.name} name="name" onChange={(e) => handleFilterOptionsChange(e.target.name, e.target.value)} />
            <input placeholder='age' value={filterOptions.age} name="age" onChange={(e) => handleFilterOptionsChange(e.target.name, e.target.value)} />
            <div>
                <label>İs Available?</label>
                <input type="checkbox" placeholder='isAvailable' checked={filterOptions.isAvailable} name="isAvailable" onChange={(e) => handleFilterOptionsChange(e.target.name, e.target.checked)} />
            </div>
            <div>
                <label for="company">Choose a company:</label>
                <select defaultValue={null} onChange={(e) => handleFilterOptionsChange('companyName', e.target.value)} id="company">
                    <option disabled selected value> -- Choose a company -- </option>
                    {companies?.map(company =>
                        <option key={company} selected={filterOptions.companyName === company}>
                            {company}
                        </option>)}
                </select>
            </div>
            <button onClick={handleSubmitFilter}>Search</button>
        </div>
    )
}

export default Filter;
