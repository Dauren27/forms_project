import {AppBar, Box, Button, Toolbar} from "@mui/material";
import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => (
    <AppBar
        position="static"
        sx={{
            backgroundColor: "#f9f9f9",
            borderBottom: "1px solid #ddd",
            color: "#000",
            padding: "10px 20px",
            boxShadow: "none",
        }}
    >
        <Toolbar
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <NavLink
                    to="/list"
                    style={({isActive}) => ({
                        textDecoration: isActive ? "underline" : "none",
                        color: isActive ? "#1565C0" : "#000",
                        fontSize: "20px",
                        fontWeight: "500",
                    })}
                    className="nav-link"
                >
                    Список работ
                </NavLink>
                <NavLink
                    to="/expert/list"
                    style={({isActive}) => ({
                        textDecoration: isActive ? "underline" : "none",
                        color: isActive ? "#1565C0" : "#000",
                        fontSize: "20px",
                        fontWeight: "500",
                    })}
                    className="nav-link"
                >
                    Экспертная оценка
                </NavLink>
            </Box>
            <Button
                variant="outlined"
                sx={{
                    color: "#000",
                    borderColor: "#000",
                    textTransform: "none",
                    ":hover": {
                        backgroundColor: "#f1f1f1",
                        borderColor: "#1565C0",
                        color: "#1565C0",
                    },
                }}
                onClick={() => {
                    sessionStorage.removeItem("token");
                    location.reload();
                }}
            >
                Выйти
            </Button>
        </Toolbar>
    </AppBar>
);

export default Header;
