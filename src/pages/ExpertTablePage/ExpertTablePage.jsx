import {
    Box,
    Button,
    CircularProgress,
    TableCell,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";

const ExpertTablePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const changePoint = (id) => {
        navigate(`/expert/form/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = JSON.parse(sessionStorage.getItem("token"));
                const response = await fetch(
                    `https://scientific-registration.onrender.com/reviews`,
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
                    Экспертиза материалов научных работ в секции "{formData[0]?.sectionName}"
                </Typography>
                <table style={{borderCollapse: "collapse", width: "100%"}}>
                    <thead>
                        <tr>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "3%",
                                }}
                                rowSpan="2"
                            >
                                №
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "15%",
                                }}
                                rowSpan="2"
                            >
                                Наименование работы (разработки)
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                }}
                                colSpan="5"
                            >
                                Экспертные оценки в баллах по критериям
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "10%",
                                }}
                                rowSpan="2"
                            >
                                Итоговый балл
                            </TableCell>
                            {/* <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "15%",
                                }}
                                rowSpan="2"
                            >
                                Заключение
                            </TableCell> */}
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "11%",
                                }}
                                rowSpan="2"
                            ></TableCell>
                        </tr>
                        <tr>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "10%",
                                }}
                            >
                                Соответствие актуальности и цели работы
                                (разработки) государственным программам и
                                мировым трендам развития науки и техники
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "10%",
                                }}
                            >
                                Уровень и достоверность результатов,
                                соответствие научной новизны требованиям
                                современной науки
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "10%",
                                }}
                            >
                                Научно-практическая значимость полученных
                                результатов
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "10%",
                                }}
                            >
                                Масштаб публикаций и уровень их вкалада в
                                результатах работы (разработки)
                            </TableCell>
                            <TableCell
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    width: "10%",
                                }}
                            >
                                Потенциал внедрения
                            </TableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((row, index) => (
                            <tr key={row?.id}>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row.workName}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row?.pointGiven
                                        ? row?.relevanceScore
                                        : "-"}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row?.pointGiven
                                        ? row?.resultsAndNoveltyScore
                                        : "-"}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row?.pointGiven
                                        ? row?.practicalSignificanceScore
                                        : "-"}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row?.pointGiven
                                        ? row?.publicationsCompletenessScore
                                        : "-"}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row?.pointGiven
                                        ? row?.implementationProspectsScore
                                        : "-"}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row?.pointGiven ? row?.totalScore : "-"}
                                </TableCell>
                                {/* <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {row?.pointGiven ? row?.conclusion : "-"}
                                </TableCell> */}
                                <TableCell
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                >
                                    {!row?.pointGiven ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => changePoint(row?.id)}
                                            sx={{
                                                backgroundColor: "#1565C0",
                                                ":hover": {
                                                    backgroundColor: "#004ba0",
                                                },
                                                textTransform: "none",
                                            }}
                                        >
                                            Выставить баллы
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => changePoint(row?.id)}
                                            sx={{
                                                backgroundColor: "#1565C0",
                                                ":hover": {
                                                    backgroundColor: "#004ba0",
                                                },
                                                textTransform: "none",
                                            }}
                                        >
                                            Изменить баллы
                                        </Button>
                                    )}
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};

export default ExpertTablePage;
