import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(
    () => JSON.parse(localStorage.getItem("authTokens")) ?? null
  );

  const registerUser = async (e) => {
    e.preventDefault();
    const body = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const respone = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await respone.json();

    if (respone.status === 201) {
      navigate("/login");
    } else {
      console.log(data);
      alert(data);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const respone = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await respone.json();

    if (respone.status === 200) {
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      navigate("/");
      window.location.reload();
    } else {
      alert("Invalid credentials");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/");
    window.location.reload();
  };

  const changeUserPassword = async (e) => {
    e.preventDefault();
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const body = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      username: e.target.username.value,
      email: e.target.email.value,
      address: {
        street: e.target.street.value,
        number: parseInt(e.target.number.value),
        apartment_number: parseInt(e.target.apartment_number.value),
        city: {
          name: e.target.city.value,
          postal_code: e.target.postal_code.value,
          country: {
            name: e.target.country.value,
          },
        },
      },
    };

    let response = await fetch("http://localhost:8000/api/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify(body),
    });
    let data = await response.json();

    if (response.status === 200) {
      window.location.reload();
    } else {
      console.log(data);
      logoutUser();
    }
  };

  const updateTokens = async () => {
    if (!authTokens) {
      setLoading(false);
      return;
    }

    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setLoading(false);
      setAuthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    let response = await fetch("http://localhost:8000/api/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      return data;
    } else {
      logoutUser();
      return null;
    }
  };

  useEffect(() => {
    if (loading) {
      updateTokens();
    }

    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateTokens();
        getUserData();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens]);

  const contextData = {
    authTokens: authTokens,

    getUserData: getUserData,
    loginUser: loginUser,
    registerUser: registerUser,
    updateUser: updateUser,
    changeUserPassword: changeUserPassword,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
