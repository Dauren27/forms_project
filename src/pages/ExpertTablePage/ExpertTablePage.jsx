import {
    Box,
    Button,
    CircularProgress,
    TableCell,
    Typography,
    TextField,
} from "@mui/material";
import React, {useEffect, useState} from "react";

const ExpertTablePage = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scores, setScores] = useState({});
    const [submittedRows, setSubmittedRows] = useState([]); // Массив для отслеживания отправленных строк

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

    const handleInputChange = (index, field, value) => {
        setScores((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: value,
            },
        }));
    };

    const handleSubmit = (index) => {
        console.log("Отправлено для строки:", index, scores[index] || {});
        // Пометить строку как отправленную
        setSubmittedRows((prev) => [...prev, index]);
    };

    const isRowDisabled = (index) => {
        // Заблокировать строку, если предыдущая не была отправлена
        return index > 0 && !submittedRows.includes(index - 1);
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
        <Box
            sx={{
                padding: "20mm",
                "@media print": {
                    padding: "0",
                    "@page": {
                        size: "A4 landscape",
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
                Экспертиза материалов научных работ в секции "Развитие
                инженерно-технических, математических, горно-геологических наук"
            </Typography>
            <Typography
                sx={{
                    fontSize: "16px",
                    fontWeight: "medium",
                    textAlign: "center",
                    marginBottom: 3,
                }}
            >
                Регистрационный лист научной секции "Развитие
                инженерно-технических, математических, горно-геологических наук"
            </Typography>
            <table style={{borderCollapse: "collapse", width: "100%"}}>
                <thead>
                    <tr>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "3%",
                            }}
                            rowSpan="2"
                        >
                            №
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "15%",
                            }}
                            rowSpan="2"
                        >
                            Наименование работы
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                            }}
                            colSpan="5"
                        >
                            Экспертное заключение в баллах по критериям оценки
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "15%",
                            }}
                            rowSpan="2"
                        >
                            Итоговый балл и заключение
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "10%",
                            }}
                            rowSpan="2"
                        >
                            Действия
                        </th>
                    </tr>
                    <tr>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "10%",
                            }}
                        >
                            Актуальность
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "10%",
                            }}
                        >
                            Новизна
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "10%",
                            }}
                        >
                            Значимость
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "10%",
                            }}
                        >
                            Публикации
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                                width: "10%",
                            }}
                        >
                            Реализация
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((row, index) => (
                        <tr key={index}>
                            <td
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                }}
                            >
                                {index + 1}
                            </td>
                            <td
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                }}
                            >
                                {row.workName}
                            </td>
                            {[
                                "relevance",
                                "novelty",
                                "significance",
                                "publications",
                                "realization",
                            ].map((field) => (
                                <td
                                    style={{
                                        border: "1px solid black",
                                        textAlign: "center",
                                    }}
                                    key={field}
                                >
                                    <TextField
                                        type="number"
                                        size="small"
                                        disabled={isRowDisabled(index)} // Заблокировать, если строка недоступна
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                field,
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                            ))}
                            <td
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                }}
                            >
                                {scores[index]
                                    ? Object.values(scores[index]).reduce(
                                          (sum, value) =>
                                              sum + (parseInt(value) || 0),
                                          0
                                      )
                                    : 0}
                            </td>
                            <td
                                style={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    disabled={isRowDisabled(index)} // Заблокировать кнопку
                                    onClick={() => handleSubmit(index)}
                                >
                                    Отправить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

export default ExpertTablePage;
