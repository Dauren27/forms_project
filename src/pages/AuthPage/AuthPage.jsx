import React, {useState} from "react";
import {TextField, Button, Typography, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const AuthPage = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (username == "bekjan.torobekov123" && password == "123") {
            sessionStorage.setItem("isAuth", "true");

            navigate("/list");
        } else {
            setError("Неверный логин или пароль");
        }
        // try {
        // const response = await fetch(
        //     "https://scientific-registration.onrender.com/auth/login",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({username, password}),
        //     }
        // );

        // } catch (err) {
        //     setError(err.message || "Что-то пошло не так");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div style={{height: "100vh", display: "flex", alignItems: "center"}}>
            <div style={{maxWidth: 400, margin: "0 auto", padding: "2rem"}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Авторизация
                </Typography>
                <TextField
                    label="Логин"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{marginTop: "1rem"}}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Войти
                </Button>
                {loading && (
                    <div style={{textAlign: "center", marginTop: "1rem"}}>
                        <CircularProgress size={24} />
                        <Typography>Загрузка...</Typography>
                    </div>
                )}
                {error && (
                    <Typography
                        color="error"
                        style={{marginTop: "1rem", textAlign: "center"}}
                    >
                        {error}
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
