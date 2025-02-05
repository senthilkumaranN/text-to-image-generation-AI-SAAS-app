import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [showLogin, setshowLogin] = useState(false);
    const [token, settoken] = useState(null);
    const [userid, setuserid] = useState(null);
    const [credit, setcredit] = useState(false);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    
    const loadUserFromStorage = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            settoken(storedUser.token);
            setuserid(storedUser.userid);
            setuser({ name: storedUser.name });
        }
    };

   
    const loadCreditData = async () => {
        try {
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }

            console.log("Token from localStorage:", token);

            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
                }
            });

            console.log("Response data:", data); 

            if (data.success) {
                setcredit(data.credits);
                setuser(data.user);
            } else {
                toast.error(data.message || "Failed to load credits");
            }
        } catch (error) {
            console.error("Error loading credit data:", error);
            toast.error(error.message || "An error occurred while fetching credit data.");
        }
    };

    
    const logout = () => {
        localStorage.removeItem('user'); 
        settoken(null);
        setuserid(null);
        setuser(null);
        toast.success("Logged out successfully!");
        navigate("/"); // Redirect to homepage
    };

    
    const generateImage = async (prompt) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser) {
                toast.error("User not found. Please log in.");
                return;
            }

            const { data } = await axios.post(`${backendUrl}/api/user/generate-image`, {
                userid: storedUser.userid, //  storedUser.userid instead of state variable
                prompt: prompt
            }, {
                headers: {
                    Authorization: `Bearer ${storedUser.token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
                }
            });

            console.log(data);

            if (data.success) {
                loadCreditData();
                return data.resultImage;
            } else {
                toast.error(data.message);

                if (data.creditBalance === 0) {
                    navigate('/credit');
                } else {
                    loadCreditData();
                }
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred while generating the image.");
        }
    };

    
    useEffect(() => {
        loadUserFromStorage();
    }, []);

    useEffect(() => {
        if (token) {
            loadCreditData();
        }
    }, [token]);

   
    const value = {
        user, setuser, showLogin, setshowLogin, backendUrl, token, settoken, credit, setcredit, logout, generateImage,
        userid, setuserid
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
