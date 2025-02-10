import React, { useState, useEffect } from 'react';
import '../styles/formstyles.css';

function Output() {
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', city: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/data');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleDeleteClick = (index) => {
    setRowToDelete(index);
    setShowConfirmModal(true); // Show confirmation modal when delete is clicked
  };

  const handleDeleteConfirm = async () => {
    try {
      const rowData = data[rowToDelete];
      console.log('Deleting ID:', rowData._id); // Log the ID being sent
      const response = await fetch(`http://localhost:5001/api/data/${rowData._id}`, {
        method: 'DELETE',
      });
  
      const responseData = await response.json();
      console.log('Response:', responseData);
  
      if (response.ok) {
        setData(data.filter((_, idx) => idx !== rowToDelete)); // Remove the deleted row from the state
        setShowConfirmModal(false); // Close the confirmation modal
      } else {
        console.error('Failed to delete data:', responseData);
        alert('Failed to delete the data.');
      }
    } catch (error) {
      console.error('Error deleting data', error);
      alert('Error deleting the data.');
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false); // Close the confirmation modal without deleting
  };

  const handleEditClick = (index) => {
    const rowData = data[index];
    setEditData(rowData);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/data/${editData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      if (response.ok) {
        setData(data.map((item) => (item._id === editData._id ? editData : item)));
        setIsEditing(false); // Close the edit modal
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Output</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(index)}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
              </tr>
              {expandedRow === index && (
                <tr className="expanded-row">
                  <td colSpan="3">
                    <button
                      className="button edit-button"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="button delete-button"
                      onClick={() => handleDeleteClick(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to delete this entry?</h2>
            <button className="button" onClick={handleDeleteConfirm}>Yes</button>
            <button className="button" onClick={handleDeleteCancel}>No</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Data</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={editData.city}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <button type="submit" className="button">Save Changes</button>
              <button
                type="button"
                className="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Output;
