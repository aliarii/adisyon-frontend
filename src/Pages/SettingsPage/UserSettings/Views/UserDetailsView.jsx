import Switch from '@mui/joy/Switch';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import BtnMdDelete from '../../../../Components/Button/BtnMdDelete';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { getCompanyById } from '../../../../State/Company/Action';
import { deleteEmployee, updateEmployee } from '../../../../State/Employee/Action';
import { useTranslation } from 'react-i18next';


const permissions = [
    { id: 0, name: "READ ALL", value: "READ_ALL", checked: false },
    { id: 1, name: "WRITE ALL", value: "WRITE_ALL", checked: false },
    { id: 2, name: "READ BASKET", value: "READ_BASKET", checked: false },
    { id: 3, name: "READ HISTORY", value: "READ_HISTORY", checked: false },
    { id: 4, name: "READ REPORT", value: "READ_REPORT", checked: false },
    { id: 5, name: "READ LOG", value: "READ_LOG", checked: false },
    { id: 6, name: "READ SETTINGS", value: "READ_SETTINGS", checked: false },
    { id: 7, name: "WRITE BASKET", value: "WRITE_BASKET", checked: false },
    { id: 8, name: "WRITE HISTORY", value: "WRITE_HISTORY", checked: false },
    { id: 9, name: "WRITE REPORT", value: "WRITE_REPORT", checked: false },
    { id: 10, name: "WRITE LOG", value: "WRITE_LOG", checked: false },
    { id: 11, name: "WRITE SETTINGS", value: "WRITE_SETTINGS", checked: false }
]
const UserDetailsView = ({ id, fullName, userName, userPermissions, handleCancelClick }) => {
    const { company } = useSelector((store) => store.company)
    const { error } = useSelector((store) => store.employee);
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const [userN, setUserN] = useState('');
    const [fullN, setFullN] = useState('');
    const [password, setPassword] = useState('');
    const [permissionsState, setPermissions] = useState(permissions);

    const [errorMessage, setErrorMessage] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fullNameError, setFullNameError] = useState('');

    useEffect(() => {
        if (fullName)
            setFullN(fullName);
        if (userName)
            setUserN(userName);
    }, [fullName, userName])

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message);
        }
    }, [error])

    const handleEmployeeDelete = () => {
        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: id,
            }
        }
        console.log("reqData", reqData);
        dispatch(deleteEmployee(reqData))
            .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
            .then(handleCancelClick);
    }


    const handleEmployeeUpdate = () => {
        const addedUserPermissions = permissionsState.filter(permission => permission.checked).map(permission => permission.value);
        const removedUserPermissions = permissionsState.filter(permission => !permission.checked).map(permission => permission.value);

        const reqData = {
            jwt: localStorage.getItem('jwt'),
            data: {
                id: id,
                fullName: fullN,
                userName: userN,
                password,
                addedUserPermissions,
                removedUserPermissions,
            }
        }
        if (fullN === '' || userN === '') {
            if (userN === '')
                setUserNameError("Enter Username");

            if (fullN === '')
                setFullNameError("Enter Full Name");

        } else {
            console.log("reqData", reqData);
            dispatch(updateEmployee(reqData))
                .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))))
                .then(() => setPassword(''))
                .then(handleCancelClick);
        }
    }

    useEffect(() => {
        if (userPermissions?.length > 0) {
            const updatedPermissions = permissionsState.map(permission => ({
                ...permission,
                checked: userPermissions.includes(permission.value),
            }));
            setPermissions(updatedPermissions);
        }
    }, [userPermissions]);

    const handleFullNChange = (event) => {
        setFullN(event.target.value);
        setErrorMessage('');
        setFullNameError('');
    };
    const handleUserNChange = (event) => {
        setUserN(event.target.value);
        setErrorMessage('');
        setUserNameError('');
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrorMessage('');
        setPasswordError('');
    };
    const handleSwitchChange = (permission) => {
        const updatedPermissions = permissionsState.map(p =>
            p.id === permission.id ? { ...p, checked: !p.checked } : p
        );
        setPermissions(updatedPermissions);  // Update state with new permissions array
    };
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>
            <div className='flex justify-between items-end w-full min-h-8'>
                <h2 >{t("User Details")}</h2>
                {fullName && <BtnMdCancel clickEvent={handleCancelClick} />}
            </div>
            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

            <div className='flex flex-col w-full h-full overflow-auto px-2 pb-2'>
                {fullName ?
                    <div className='flex flex-col w-full h-full gap-2 overflow-auto'>

                        {errorMessage && <div className='text-red-500'>{t(errorMessage) || t("Error")}</div>}
                        <div className='flex flex-col w-full h-full gap-2 overflow-auto'>
                            <h2>{t("Full Name")}:</h2>
                            <input
                                type='text'
                                autoCapitalize='off'
                                className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                                placeholder={t('Full Name')}
                                name='fullN'
                                value={fullN}
                                onChange={handleFullNChange}
                            />
                            {fullNameError && <h2 className='-mt-2 text-sm text-red-500'>*{t(fullNameError)}</h2>}
                            <h2>{t("Username")}:</h2>
                            <input
                                type='text'
                                autoCapitalize='off'
                                className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                                placeholder={t('Username')}
                                name='userN'
                                value={userN}
                                onChange={handleUserNChange}
                            />
                            {userNameError && <h2 className='-mt-2 text-sm text-red-500'>*{t(userNameError)}</h2>}
                            <h2>{t("Password")}:</h2>
                            <input
                                className='w-full py-1 px-2 border border-light-10 outline-none bg-white rounded-lg dark:text-dark-8'
                                type="password"
                                placeholder={t('Password')}
                                name='password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {permissionsState.map((permission, idx) => (
                                <div key={idx} className='flex justify-start items-center gap-2'>
                                    <Switch
                                        checked={permission.checked}
                                        id={permission.name}
                                        onChange={() => handleSwitchChange(permission)}

                                    />
                                    <h2>{t(permission.name)}</h2>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end w-full gap-2'>
                            <BtnMdDelete clickEvent={handleEmployeeDelete} />
                            <BtnMdSave clickEvent={handleEmployeeUpdate} />
                        </div>
                    </div>
                    :
                    <h2>{t("Select a user")}.</h2>
                }
            </div>
        </div>
    )
}

export default UserDetailsView