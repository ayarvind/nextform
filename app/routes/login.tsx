import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Account, Client, ID } from 'appwrite';
import getAppWriteClient from '~/appwrite';
import axios from 'axios';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from '@remix-run/react';
import { useUserContext } from '~/context/useUserContext';

export const meta: MetaFunction = () => {
    return [
      { title: "Login to NextForm" },
      { name: "description", content: "A tool for creating customizable forms with ease." },
    ];
  };

function Index() {
    const [verifying, setVerifying] = useState(false);
    const {setUser} = useUserContext();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [token, setToken] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [client, setClient] = useState<Client>();
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
        if(cookies.get('auth-token')){
            navigate('/');
         }
        if (window.env) {
            const { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } = window.env;
            const client = getAppWriteClient(APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID);
            setClient(client);
        }

    }, [])
    const handleSendCode = async () => {
        setLoading(true);
        const phoneRegExp = /^[6-9]\d{9}$/;
        const phoneSchema = yup.string().matches(phoneRegExp, 'Phone number is not valid');

        try {
            await phoneSchema.validate(phone);
            setError('');
            const account = new Account(client!);

            const token = await account.createPhoneToken(ID.unique(), `+91${phone}`);
            if (token.$id) {
                setToken(token);
              
                setStep(2);
            } else {
                setError('Error sending OTP');
            }
        } catch (err: any) {
            setError(err.message || 'Invalid phone number');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!token) {
            setError('Something went wrong');
            return;
        }
        setVerifying(true);

        try {
            const account = new Account(client!);
            // delete session if exist
            await account.deleteSession('current');
            await account.createSession(token.userId, otp);
            const response = await axios.post(`${window.env.API_BASE_URL}/auth?phone=${phone}`)
            setOtp('');
            if(response.status == 201){
                // destroy the session if it exists
                // setting our own cookie to all paths
                cookies.set('auth-token',response.data.token );
                toast.success("Login successful");
                setUser(response.data.user);
                navigate('/');
            }

        } catch (err: any) {
            setError(err.message || 'Invalid OTP');
        }
        finally {
            setVerifying(false);
        }

    };

    return (
        <div className="flex flex-col justify-center items-center mt-28">
            <div className="flex flex-col gap-4 p-8 w-full max-w-md bg-white rounded-lg ">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Sign In</h1>
                <span
                    className='text-gray-600 text-sm'
                >
                    {step === 1
                        ? 'Enter your phone number to receive OTP'
                        : 'Enter the OTP sent to your phone'}
                </span>

                {step === 1 ? (
                    <>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            onClick={handleSendCode}
                            type="button"
                            disabled={loading}
                            className={`w-full bg-black text-white font-semibold py-3 rounded-lg mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            onClick={handleVerifyCode}
                            type="button"
                            disabled={verifying}
                            className={`w-full bg-black text-white font-semibold py-3 rounded-lg mt-6 ${verifying ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {verifying ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Index;
