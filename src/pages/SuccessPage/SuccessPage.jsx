import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                backgroundColor: "#1976d2",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    boxShadow: 3,
                    padding: 4,
                    maxWidth: 650,
                    minHeight: 400,
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <div style={{position: "absolute", top: 20, left: 20}}>
                    <Button
                        onClick={() => navigate("/send-application")}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Назад
                    </Button>
                </div>
                <Typography
                    sx={{
                        color: "#1976d2",
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginBottom: 2,
                        textAlign: "center",
                    }}
                >
                    Заявка была успешно отправлена
                </Typography>
            </Box>
        </Box>
    );
};

export default SuccessPage;
