import React, {useEffect, useState} from "react";
import {
    TextField,
    Button,
    Typography,
    CircularProgress,
    Grid,
    Box,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../redux/reducers/authApi";
import {useSelector} from "react-redux";

const AuthPage = () => {
    const navigate = useNavigate();
    const [login, {isError, error, isSuccess, isLoading, data}] =
        useLoginMutation();
    const {isAuth} = useSelector((state) => state.auth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await login({username, password});
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/list");
        }
    });
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
            }}
        >
            <Box
                component="form"
                onSubmit={() => {}}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    boxShadow: 3,
                    padding: 4,
                    maxWidth: 650,
                    width: "100%",
                }}
            >
                <Grid item xs={8}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{textAlign: "center"}}
                    >
                        Авторизация
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        Логин
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Введите логин"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{marginTop: 0, marginBottom: 3}}
                        required
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        Пароль
                    </Typography>
                    <TextField
                        variant="outlined"
                        type="password"
                        placeholder="Введите пароль"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{marginTop: 0}}
                        required
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{marginTop: "1rem"}}
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        Войти
                    </Button>
                    {isLoading && (
                        <div style={{textAlign: "center", marginTop: "1rem"}}>
                            <Typography color="blue">Загрузка...</Typography>
                        </div>
                    )}
                    {isError && (
                        <Typography
                            color="error"
                            style={{marginTop: "1rem", textAlign: "center"}}
                        >
                            Неверный логин или пароль
                        </Typography>
                    )}
                    {isSuccess && (
                        <Typography
                            color="success"
                            style={{marginTop: "1rem", textAlign: "center"}}
                        >
                            Вы успешно авторизовались
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default AuthPage;
