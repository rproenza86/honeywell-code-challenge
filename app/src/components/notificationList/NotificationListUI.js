import React, { useState, useEffect, useMemo } from 'react';

export const API_ENDPOINT = 'http://localhost:8080/notifications';

function useEffectAsync(effect, inputs) {
    useEffect(() => {
        effect();
    }, inputs);
}

const NotificationList = () => {
    const [notifications, setNotifications] = useState(null);
    const [severity, setSeverity] = useState(null);

    const getNotifications = async () => {
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

    useEffectAsync(getNotifications, []);

    const notificationList = useMemo(() => {
        if (!notifications || notifications.length === 0) {
            return '';
        }

        if (!severity && notifications && notifications.length > 0) {
            return (
                <ul className="mt-50 styled" data-testid="movieList">
                    {notifications.map(({ title, description, id }) => (
                        <li className="slide-up-fade-in py-10" key={id}>
                            <p>
                                <strong>{title}</strong>
                            </p>
                            <p>{description}</p>
                        </li>
                    ))}
                </ul>
            );
        }

        if (severity && notifications && notifications.length > 0) {
            const validNotification = notifications.filter(({ severity: sev }) => sev === severity);

            if (validNotification.length) {
                return (
                    <ul className="mt-50 styled" data-testid="movieList">
                        {validNotification.map(({ title, description, id }) => (
                            <li className="slide-up-fade-in py-10" key={id}>
                                <p>
                                    <strong>{title}</strong>
                                </p>
                                <p>{description}</p>
                            </li>
                        ))}
                    </ul>
                );
            }
        }
    }, [severity, notifications]);

    const addNotification = () => {};

    const selectHandler = async ({ target: { value: severity } }) => {
        setSeverity(severity);
    };

    return (
        <div className="layout-column align-items-center mt-50">
            <section className="layout-row align-items-center justify-content-center">
                <div className="select">
                    <select id="user-select" onChange={selectHandler}>
                        <option selected disabled value="-1">
                            Select Severity
                        </option>
                        <option value="1">Normal</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </div>
                <button className="" data-testid="add-button" onClick={addNotification}>
                    Add Notification
                </button>
            </section>

            {notificationList}
        </div>
    );
};

export default NotificationList;
