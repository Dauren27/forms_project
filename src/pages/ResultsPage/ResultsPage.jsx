import {
    Box,
    CircularProgress,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";

const ResultsPage = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(
                    `https://scientific-registration.onrender.com/evaluation/results`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(`Bearer ${token}`);
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.statusText}`);
                }
                const datta = await response.json();
                setFormData(datta);
            } catch (error) {
                setError(error.message);
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

    return (
        <Box>
            <Header />

            <Box
                sx={{
                    padding: "50px",
                    "@media print": {
                        padding: "0",
                        "@page": {
                            size: "A4 landscape",
                            margin: 0,
                            margin: "20mm",
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
                        fontSize: "20px",
                        fontWeight: "semi-bold",
                        textAlign: "center",
                        marginBottom: 3,
                    }}
                >
                    Ранжирование и экспертное заключние материалов секции
                    "Развитие инженерно-технических, математических,
                    горно-геологических наук"
                </Typography>
                <table style={{borderCollapse: "collapse", width: "100%"}}>
                    <thead>
                        <tr>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "5%",
                                }}
                            >
                                №
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "25%",
                                }}
                            >
                                Наименование работы (разработки)
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "20%",
                                }}
                            >
                                Ф.И.О соискателя(ей)
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "20%",
                                }}
                            >
                                Итоговый балл
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "30%",
                                }}
                            >
                                Заключение
                            </TableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {formData?.results?.map((row, index) => {
                            const applicantRows = row.applicants.map(
                                (applicant, i) => (
                                    <TableRow key={`${index}-${i}`}>
                                        {i === 0 && (
                                            <>
                                                <TableCell
                                                    rowSpan={
                                                        row.applicants.length
                                                    }
                                                    align="center"
                                                    sx={{
                                                        border: "1px solid black",
                                                    }}
                                                >
                                                    {index + 1}
                                                </TableCell>
                                            </>
                                        )}

                                        {i === 0 && (
                                            <>
                                                <TableCell
                                                    rowSpan={
                                                        row.applicants.length
                                                    }
                                                    align="center"
                                                    sx={{
                                                        border: "1px solid black",
                                                    }}
                                                >
                                                    {row.workName}
                                                </TableCell>
                                            </>
                                        )}
                                        <TableCell
                                            sx={{
                                                border: "1px solid black",
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            <p>
                                                {applicant.fullName.replace(
                                                    / /g,
                                                    "\n"
                                                )}
                                            </p>
                                        </TableCell>
                                        {i === 0 && (
                                            <>
                                                <TableCell
                                                    rowSpan={
                                                        row.applicants.length
                                                    }
                                                    align="center"
                                                    sx={{
                                                        border: "1px solid black",
                                                    }}
                                                >
                                                    {row.finalScore.toFixed(2)}
                                                </TableCell>
                                                <TableCell
                                                    rowSpan={
                                                        row.applicants.length
                                                    }
                                                    align="center"
                                                    sx={{
                                                        border: "1px solid black",
                                                    }}
                                                >
                                                    {row.conclusion}
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
                <Box sx={{marginTop: 4, fontSize: "14px", marginRight: "10em"}}>
                    {/* <Typography sx={{marginBottom: 2}}>
                        Дата завершения приема документов 11 декабря 2024г.
                    </Typography> */}
                    {/* <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography
                            sx={{marginBottom: 2, marginRight: "80px"}}
                        >
                            Члены научной секций:
                        </Typography>
                    </Box> */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography>
                            Члены научной секций: <span style={{marginLeft: "30px"}}>Торобеков Б.Г.</span>
                            <span style={{marginLeft: "30px"}}>
                                ___________
                            </span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography>
                            Жеенбаев Н. Ж.{" "}
                            <span style={{marginLeft: "30px"}}>
                                ___________
                            </span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography>
                            Кабаева Г. Д.{" "}
                            <span style={{marginLeft: "30px"}}>
                                ___________
                            </span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography>
                            Кененбаева Г.М.{" "}
                            <span style={{marginLeft: "30px"}}>
                                ___________
                            </span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography>
                            Курманбек уулу Т.{" "}
                            <span style={{marginLeft: "30px"}}>
                                ___________
                            </span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography>
                            Турсунов Д.А.{" "}
                            <span style={{marginLeft: "30px"}}>
                                ___________
                            </span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Typography>
                            Шамсутдинов М.М.{" "}
                            <span style={{marginLeft: "30px"}}>
                                ___________
                            </span>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ResultsPage;
