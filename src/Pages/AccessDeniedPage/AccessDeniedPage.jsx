import React from 'react'

const AccessDeniedPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white dark:bg-dark-9">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
                <p className="mt-4 text-dark-9 dark:text-light-7">You do not have a permission to view this page.</p>
            </div>
        </div>
    )
}

export default AccessDeniedPage