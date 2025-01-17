import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    TableCell,
    TableRow,
    Button,
    CircularProgress,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";

const TablePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Функция для получения данных с API
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = JSON.parse(sessionStorage.getItem("token"));

                const response = await fetch(
                    "https://scientific-registration.onrender.com/registrations",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.statusText}`);
                }
                const data = await response.json();
                setFormData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePrint = () => {
        navigate("/list/print");
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "34px",
                        fontWeight: "bold",
                    }}
                >
                    Загрузка данных...
                </Typography>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Typography
                color="error"
                sx={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "24px",
                    fontWeight: "bold",
                }}
            >
                Ошибка загрузки: {error}
            </Typography>
        );
    }

    return (
        <Box>
            <Header />
            <Box sx={{padding: "50px", fontFamily: "Arial, sans-serif"}}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePrint}
                        sx={{
                            backgroundColor: "#1565C0",
                            ":hover": {backgroundColor: "#004ba0"},
                        }}
                    >
                        Распечатать
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 2,
                    }}
                >
                    <div>
                        {/* 
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#1565C0",
                        }}
                    >
                        Заявки на государственную премию
                    </Typography> */}
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: 1,
                            }}
                        >
                            Государственная премия в области науки и техники КР
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "medium",
                                textAlign: "center",
                                marginBottom: 3,
                            }}
                        >
                            Регистрационный лист научной секции "{formData?.sectionName}"
                        </Typography>
                    </div>
                </Box>

                <table>
                    <tbody>
                        <tr>
                            <TableCell
                                align="center"
                                sx={{border: "1px solid black", width: "3%"}}
                            >
                                №
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{border: "1px solid black", width: "7%"}}
                            >
                                Дата поступления
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{border: "1px solid black", width: "10%"}}
                            >
                                Ф.И.О соискателя(ей)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{border: "1px solid black", width: "15%"}}
                            >
                                Учёная степень/звание, специальное звание
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{border: "1px solid black", width: "20%"}}
                            >
                                Наименование работы (разработки)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{border: "1px solid black", width: "20%"}}
                            >
                                Направление и характер работы (область науки и
                                техники)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{border: "1px solid black", width: "25%"}}
                            >
                                Анализ публикаций
                            </TableCell>
                        </tr>
                        {formData?.registrations.map((row, index) =>
                            row.applicants.map((applicant, i) => (
                                <TableRow key={`${index}-${i}`}>
                                    {i === 0 && (
                                        <>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{border: "1px solid black"}}
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{border: "1px solid black"}}
                                            >
                                                {row.submissionDate}
                                            </TableCell>
                                        </>
                                    )}
                                    <TableCell
                                        sx={{
                                            border: "1px solid black",
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        {applicant.fullName.replace(/ /g, "\n")}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: "1px solid black",
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        {applicant.specialTitle}
                                    </TableCell>
                                    {i === 0 && (
                                        <>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{border: "1px solid black"}}
                                            >
                                                {row.workName}
                                            </TableCell>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{border: "1px solid black"}}
                                            >
                                                {row.workDirection}
                                            </TableCell>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{border: "1px solid black"}}
                                            >
                                                {row.additionalInfo}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};

export default TablePage;
