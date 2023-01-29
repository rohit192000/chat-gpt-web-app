// import React from 'react';

// const Table = ({ headers, data }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th key={index}>{header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {row.map((cell, index) => (
//               <td key={index}>{cell}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
// import React from 'react';

// const Table = ({ headers, data, onEdit, onDelete }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th key={index}>{header}</th>
//           ))}
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {row.map((cell, index) => (
//               <td key={index}>{cell}</td>
//             ))}
//             <td>
//               <button onClick={() => onEdit(index)}>Edit</button>
//               <button onClick={() => onDelete(index)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
// import React, { useState } from 'react';

// const Table = ({ headers, data, onUpdate ,onEdit, onDelete}) => {
//   const [editingIndex, setEditingIndex] = useState(-1);
//   const [editedData, setEditedData] = useState([]);

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setEditedData(data[index]);
//   };

//   const handleChange = (event, index) => {
//     const { name, value } = event.target;
//     setEditedData((prevData) => {
//       const newData = [...prevData];
//       newData[headers.indexOf(name)] = value;
//       return newData;
//     });
//   };

//   const handleUpdate = (index) => {
//     onUpdate(index, editedData);
//     setEditingIndex(-1);
//     setEditedData([]);
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th key={index}>{header}</th>
//           ))}
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {row.map((cell, index) => {
//               if (index === editingIndex) {
//                 return (
//                   <td key={index}>
//                     <input
//                       type="text"
//                       name={headers[index]}
//                       value={editedData[index] || ""}
//                       onChange={(event) => handleChange(event, index)}
//                     />
//                   </td>
//                 );
//               } else {
//                 return <td key={index}>{cell}</td>;
//               }
//             })}
//             <td>
//               {index === editingIndex ? (
//                 <>
//                   <button onClick={() => handleUpdate(index)}>Update</button>
//                   <button onClick={() => setEditingIndex(-1)}>Cancel</button>
//                 </>
//               ) : (
//                 <button onClick={() => handleEdit(index)}>Edit</button>
//               )}
//               <button onClick={() => onDelete(index)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Table({headers, data}) {
    const [rows, setRows] = useState(data);
    const [editing, setEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setRows(data);
    }, [data])

    const handleEdit = (index) => {
        setEditing(true);
        setEditingIndex(index);
        setFormData({...rows[index]});
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`/route/to/delete/${id}`);
        if (response.status === 200) {
            setRows(rows.filter(row => row.id !== id));
        }
    }

    const handleSave = async (id) => {
        const response = await axios.put(`/route/to/update/${id}`, formData);
        if (response.status === 200) {
            setRows(rows.map(row => (row.id === id ? {...formData, id: id} : row)));
            setEditing(false);
            setEditingIndex(null);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header, index) => (
                            <td key={index}>
                                {editing && editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={formData[header.toLowerCase()]}
                                        onChange={(e) => setFormData({...formData, [header.toLowerCase()]: e.target.value})}
                                    />
                                ) : row[header.toLowerCase()]}
                            </td>
                        ))}
                        <td>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                            <button onClick={() => handleDelete(row.id)}>Delete</button>
                            {editing && editingIndex === index ? (
                                <button onClick={() => handleSave(row.id)}>Save</button>
                            ) : null}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
