import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const ListView = () => {
    const [users, setUsers] = useState([])
    const [searchParams] = useSearchParams();

    const fetchCompanyList = async () => {
        const name = searchParams.get('name');
        const age = searchParams.get('age');
        const isAvailable = searchParams.get('isAvailable');
        const companyName = searchParams.get('companyName');


        const url = new URL("http://localhost:3001/api/users"),
            params = { name, age, isAvailable, companyName }
        Object.keys(params).filter(key => !!params[key]).forEach(key => url.searchParams.append(key, params[key]));

        await fetch(url).then(res => res.json()).then(response => setUsers(response)).catch(err => console.log(err));
    }

    useEffect(() => {
        fetchCompanyList()
    }, [searchParams]);



    return (
        <div>{users?.map(user => <div>
            <img src={user.image} width={50} height={50} alt={user.firstName} />
            <span>{`${user.firstName} ${user.lastName}  - age :${user.age} - email:${user.email}  `} </span>
        </div>
        )}</div>
    )
}

export default ListView