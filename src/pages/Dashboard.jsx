import React, { useEffect, useState } from 'react';
import { getAllPatients } from '../services/operations/authAPI';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllPatients();
                if (result) {
                    setPatients(result);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        }
        fetchData();
    }, []);

    return (
      <>
        <div className="w-full overflow-x-auto">
            <Table className="w-full rounded-xl border border-richblack-800">
                <Thead>
                    <Tr className="bg-richblack-800 text-richblack-100">
                        <Th className="px-6 py-2 text-left">Name</Th>
                        <Th className="px-6 py-2 text-left">Contact</Th>
                        <Th className="px-6 py-2 text-left">Address</Th>
                        <Th className="px-6 py-2 text-left">Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {patients.length === 0 ? (
                        <Tr>
                            <Td colSpan="4" className="py-4 text-center">
                                No data found
                            </Td>
                        </Tr>
                    ) : (
                        patients.map(patient => (
                            <Tr key={patient._id} className="bg-richblack-700 text-richblack-100">
                                <Td className="px-6 py-4">{`${patient.firstName} ${patient.lastName}`}</Td>
                                <Td className="px-6 py-4">{patient.contactNumber}</Td>
                                <Td className="px-6 py-4">{patient.address}</Td>
                                <Td className="px-6 py-4">{patient.description}</Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </div>
   
      </>
    );
};

export default Dashboard;
