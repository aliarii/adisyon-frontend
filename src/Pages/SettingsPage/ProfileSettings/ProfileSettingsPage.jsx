import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

const ProfileSettingsPage = () => {
    // const { user } = useSelector((store) => store.auth)
    //  const [fullName, setCompanyName] = useState('');
    //  const [companyNameError, setCompanyNameError] = useState('');
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (company)
    //         setCompanyName(company.name);
    // }, [company])

    // const handleNameChange = (event) => {
    //     const value = event.target.value;
    //     setCompanyName(value);
    //     setCompanyNameError("");
    // }
    // const handleCompanyUpdate = () => {

    //     const reqData = {
    //         jwt: localStorage.getItem('jwt'),
    //         data: {
    //             id: company.id,
    //             name: companyName
    //         }
    //     }
    //     if (companyName === '') {
    //         setCompanyNameError("Enter Company Name.");
    //     }
    //     else {
    //         dispatch(updateCompany(reqData))
    //             .then(() => dispatch(getCompanyById(company.id, localStorage.getItem('jwt'))));
    //     }
    // }

    // const formatDate = (date) => {
    //     const formatDate = new Date(date);
    //     const formattedDate = `${String(formatDate.getDate()).padStart(2, '0')}.${String(formatDate.getMonth() + 1).padStart(2, '0')}.${String(formatDate.getFullYear()).slice(-2)}`;
    //     return `${formattedDate}`;
    // };

    return (
        <div className='size-full bg-light-2 dark:bg-dark-7 rounded-lg overflow-auto'>

            <div className='flex flex-col w-full h-full p-2 gap-2 bg-light-2 dark:bg-dark-7 rounded-lg overflow-auto'>

                <div className='flex justify-between items-end w-full min-h-8'>
                    <h2>Profile</h2>
                </div>

                <div className='py-0.5 rounded-full bg-light-7 dark:bg-light-10 text-dark-1 dark:text-light-10' />

                <div className='flex flex-col w-full h-full gap-2 px-2 overflow-auto'>
                    <h2>Full Name:</h2>
                    <input
                        type='text'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                        placeholder='Enter'
                        name='fullName'
                    // value={user?.fullName}
                    // onChange={() => { }}
                    />
                    {/* {companyNameError && <h2 className='-mt-2 text-sm text-red-500'>*{companyNameError}</h2>} */}
                    <h2>User Name:</h2>
                    <input
                        type='text'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                        placeholder='Enter'
                        name='userName'
                    // value={user?.userName}
                    // onChange={() => { }}
                    />
                    <h2>Email:</h2>
                    <input
                        type='text'
                        autoCapitalize='off'
                        className='w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8'
                        placeholder='Enter'
                        name='email'
                    // value={user?.email}
                    // onChange={() => { }}
                    />
                    <div className='flex justify-end w-full gap-2'>
                        {/* <BtnMdSave clickEvent={handleCompanyUpdate} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettingsPage