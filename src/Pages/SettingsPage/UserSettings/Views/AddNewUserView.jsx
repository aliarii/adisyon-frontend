import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnMdCancel from '../../../../Components/Button/BtnMdCancel';
import BtnMdSave from '../../../../Components/Button/BtnMdSave';
import { registerEmployee } from '../../../../State/Auth/Action';
import { getCompanyById } from '../../../../State/Company/Action';
import { useTranslation } from 'react-i18next';


const AddNewUserView = ({ handleCancelClick }) => {
    const { company } = useSelector((store) => store.company)
    const { error } = useSelector((store) => store.auth);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fullNameError, setFullNameError] = useState('');

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message);
        }
    }, [error])
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const reqData = {
            data: {
                fullName: fullName,
                userName: userName,
                password: password,
                companyId: company.id,
            }
        }
        if (fullName === '' || userName === '' || password === '') {
            if (userName === '')
                setUserNameError("Enter Username");
            if (password === '')
                setPasswordError("Enter Password");
            if (fullName === '')
                setFullNameError("Enter Full Name");

        } else
            dispatch(registerEmployee(reqData))
                .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))));
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
        setErrorMessage('');
        setFullNameError('');
    };
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
        setErrorMessage('');
        setUserNameError('');
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrorMessage('');
        setPasswordError('');
    };

    return (
        <div className='flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-2 dark:bg-dark-7 overflow-auto'>
            <div className='flex justify-between items-end w-full min-h-8'>
                <h2>{t("Add New User")}</h2>
                <BtnMdCancel clickEvent={handleCancelClick} />
            </div>

            <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />


            <div className='flex flex-col h-full px-2 pb-2'>
                {errorMessage && <div className='text-red-500'>{errorMessage || "Error"}</div>}
                <form className='flex flex-col h-full gap-2' onSubmit={handleSubmit}>
                    <h2>{t("Full Name")}:</h2>
                    <input
                        type='text'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                        placeholder={t('Full Name')}
                        name='fullName'
                        value={fullName}
                        onChange={handleFullNameChange}
                    />
                    {fullNameError && <h2 className='-mt-2 text-sm text-red-500'>*{fullNameError}</h2>}
                    <h2>{t("Username")}:</h2>
                    <input
                        type='text'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                        placeholder={t('Username')}
                        name='userName'
                        value={userName}
                        onChange={handleUserNameChange}
                    />
                    {userNameError && <h2 className='-mt-2 text-sm text-red-500'>*{userNameError}</h2>}
                    <h2>{t("Password")}:</h2>
                    <div className='flex w-full'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoCapitalize='off'
                            className='w-full py-1 px-2 border-l border-y border-light-10 outline-none bg-white rounded-l-lg dark:text-dark-8'
                            placeholder={t('Password')}
                            name='password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className='px-3 flex items-center rounded-r-lg border-r border-y border-light-10 outline-none bg-white cursor-pointer dark:text-dark-8' onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </div>
                    </div>
                    {passwordError && <h2 className='-mt-2 text-sm text-red-500'>*{passwordError}</h2>}

                    {/* <button className='self-end  flex justify-center items-center w-24 h-8 gap-1 rounded-lg cursor-pointer text-light-1 bg-success' type='submit' >
                        <h2>Save</h2>
                        <SaveIcon />
                    </button> */}
                    <button className='self-end' type='submit'>
                        <BtnMdSave />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNewUserView