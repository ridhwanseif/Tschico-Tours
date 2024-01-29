import { Table0 } from "../Table/Table0"
import "./chart.scss"
import axios from "../../api/axios";
import { useEffect, useState } from "react";


export const Chart = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const allUsers = 'users/';
            const response = await axios.get(allUsers)

            // Handle the data as needed
            console.log('Users:', response.data);

            // Update state or perform other operations
            setUsers(response.data.reverse());


        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div className='chart'>
            <Table0
                col1='Name'
                col2='Email'
                col3='Phone Number'
                col4='Status'
                rows={users}
            />
        </div>
    )
}