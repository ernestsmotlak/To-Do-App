import React, { useState } from 'react'

const Child = () => {
    const [pathName, setPathName] = useState('');
    const [number, setNumber] = useState('');
    
    const handleSubmit = async (event) => { 
        event.preventDefault();
        console.log(pathName);
        console.log(number);
    };

    return (
        <div>Child <br />
            <form onSubmit={handleSubmit}>
                Name:
                <input type="text" value={pathName} onChange={(e) => setPathName(e.target.value)} />
                <br />
                Number:
                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Child