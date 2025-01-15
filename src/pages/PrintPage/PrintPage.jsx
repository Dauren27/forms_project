import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    TableCell,
    TableRow,
    CircularProgress,
} from "@mui/material";

const PrintPage = () => {
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

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.print();
    //     }, 1500);
    //     console.log("sex");
    // }, []);

    return (
        <Box
            sx={{
                padding: "20mm",
                "@media print": {
                    padding: "0",
                    "@page": {
                        size: "A4 landscape",
                        margin: 0,
                        margin: "15mm",
                    },
                },
            }}
        >
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
                    fontSize: "16px",
                    fontWeight: "medium",
                    textAlign: "center",
                    marginBottom: 3,
                }}
            >
                Регистрационный лист научной секции "{formData?.sectionName}"
            </Typography>

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
                            sx={{border: "1px solid black", width: "5%"}}
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
                            sx={{border: "1px solid black", width: "15%"}}
                        >
                            Наименование работы (разработки)
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{border: "1px solid black", width: "29%"}}
                        >
                            Направление и характер работы (область науки и
                            техники)
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{border: "1px solid black", width: "23%"}}
                        >
                            Анализ публикаций
                        </TableCell>
                    </tr>
                    {formData?.registrations.map((row, index) => {
                        const applicantRows = row.applicants.map(
                            (applicant, i) => (
                                <TableRow key={`${index}-${i}`}>
                                    {i === 0 && (
                                        <>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{
                                                    border: "1px solid black",
                                                }}
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{
                                                    border: "1px solid black",
                                                    padding: "2px !important",
                                                }}
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
                                        {/* {applicant.fullName} */}
                                        <p>
                                            {applicant.fullName.replace(
                                                / /g,
                                                "\n"
                                            )}
                                        </p>
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
                                                sx={{
                                                    border: "1px solid black",
                                                }}
                                            >
                                                {row.workName}
                                            </TableCell>
                                        </>
                                    )}
                                    {i === 0 && (
                                        <>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{
                                                    border: "1px solid black",
                                                }}
                                            >
                                                {row.workDirection}
                                            </TableCell>
                                            <TableCell
                                                rowSpan={row.applicants.length}
                                                align="center"
                                                sx={{
                                                    border: "1px solid black",
                                                }}
                                            >
                                                {row.additionalInfo}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            )
                        );
                        return applicantRows;
                    })}
                </tbody>
            </table>
            <Box sx={{marginTop: 4, fontSize: "14px"}}>
                <Typography sx={{marginBottom: 2}}>
                    Дата завершения приема документов _______________г.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 4,
                    }}
                >
                    <Typography sx={{marginBottom: 2}}>
                        Руководитель секций
                    </Typography>
                    <Typography>____________________</Typography>
                </Box>
                <Typography>Секретарь секций</Typography>
            </Box>
        </Box>
    );
};

export default PrintPage;
