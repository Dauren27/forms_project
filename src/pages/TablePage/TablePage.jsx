import React, {useEffect, useState} from "react";
import {Box, Typography, TableCell, TableRow, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

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
                const response = await fetch(
                    "https://scientific-registration.onrender.com/registrations"
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
        return <Typography>Загрузка данных...</Typography>;
    }

    if (error) {
        return <Typography color="error">Ошибка загрузки: {error}</Typography>;
    }

    return (
        <Box sx={{padding: "50px", fontFamily: "Arial, sans-serif"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#1565C0",
                    }}
                >
                    Заявки на государственную премию
                </Typography>
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
                            Учёная степень/звание
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{border: "1px solid black", width: "20%"}}
                        >
                            Наименование работы
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{border: "1px solid black", width: "20%"}}
                        >
                            Направление работы
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{border: "1px solid black", width: "25%"}}
                        >
                            Информация о работе
                        </TableCell>
                    </tr>
                    {formData.map((row, index) =>
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
    );
};

export default TablePage;
