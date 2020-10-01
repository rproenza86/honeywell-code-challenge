import React, { useState } from 'react';

// import API_ENDPOINT

function AddNotificationFormUI() {
    const [title, setTitle] = useState(false);
    const [description, setDescription] = useState(false);
    const [severity, setSeverity] = useState(false);

    const saveNotification = async () => {
        try {
            const response = await fetch(API_ENDPOINT);
            const notificationsResponse = await response.json();

            if (response.status === 200) {
                setNotifications(notificationsResponse);
                console.log(notificationsResponse);
            } else {
                console.warn({ response, notifications: notificationsResponse });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="row">
            <h1 className="text-center">Add Notification</h1>
            <form>
                <h3>Title:</h3>
                <input
                    required
                    type="text"
                    name="title"
                    value={title}
                    className="title"
                    placeholder="Notification Title"
                    onChange={({ target: { value } }) => setTitle(value)}
                />
                <h3>Description:</h3>
                <input
                    required
                    type="text"
                    name="description"
                    value={description}
                    className="description"
                    placeholder="Notification description"
                    onChange={({ target: { value } }) => setDescription(value)}
                />
                <h3>Severity:</h3>
                <input
                    required
                    type="text"
                    name="phone"
                    value={phone}
                    className="phone"
                    onChange={handleChange}
                    placeholder="2369573987"
                />
                <select onChange={({ target: { value } }) => setSeverity(value)}>
                    <option selected disabled value="-1">
                        Select Severity
                    </option>
                    <option value="1">Normal</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>
                <div
                    className="small-6 small-centered text-center columns"
                    onClick={() => saveNotification()}
                >
                    <a href="#" className="button success expand round text-center">
                        Add
                    </a>
                </div>
            </form>
        </div>
    );
}

export default AddNotificationFormUI;
