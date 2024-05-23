import React from 'react';

const NotFoundPage = () => {
    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            fontSize: "40px",
        }}
        >
            <h1>404</h1>
            <p>Page not found</p>
        </div>
    );
};

export default NotFoundPage;