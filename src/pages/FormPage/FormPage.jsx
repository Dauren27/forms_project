import React, {useEffect, useState} from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Grid,
    IconButton,
    CircularProgress,
} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FormPage = () => {
    const navigate = useNavigate();
    const [publicationData, setPublicationData] = useState({
        totalPublications: "",
        textbooks: "",
        monographs: "",
        patents: "",
        articles: "",
        scopus: "",
        webScience: "",
        certificates: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        submissionDate: "",
        workName: "",
        applicants: [{fullName: "", specialTitle: ""}],
        workDirection: "",
        additionalInfo: `Общее кол. публикаций ${publicationData.totalPublications}, в т.ч. учебников ${publicationData.textbooks}, монографии ${publicationData.monographs}, патентов ${publicationData.patents}, авт. свидетельств ${publicationData.certificates}, статей ${publicationData.articles}, в т.ч. в базе Scopus и Web of Science ${publicationData.scopus}, с квартилем не ниже Q3 ${publicationData.webScience}.`,
    });

    const handleTextareaChange = (field, value) => {
        setPublicationData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleApplicantChange = (index, field, value) => {
        const updatedApplicants = [...formData.applicants];
        updatedApplicants[index][field] = value;
        setFormData((prev) => ({...prev, applicants: updatedApplicants}));
    };

    const addApplicant = () => {
        setFormData((prev) => ({
            ...prev,
            applicants: [...prev.applicants, {fullName: "", specialTitle: ""}],
        }));
    };

    const removeApplicant = (index) => {
        const updatedApplicants = formData.applicants.filter(
            (_, i) => i !== index
        );
        setFormData((prev) => ({...prev, applicants: updatedApplicants}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                "https://scientific-registration.onrender.com/registrations/create",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response:", response.data);
            navigate("/success-page"); // Перенаправление на страницу успеха
        } catch (err) {
            console.error("Ошибка при отправке данных:", err);
            setError("Произошла ошибка при отправке данных. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            additionalInfo: `Общее кол. публикаций ${publicationData.totalPublications}, в т.ч. учебников ${publicationData.textbooks}, монографии ${publicationData.monographs}, патентов ${publicationData.patents}, авт. свидетельств ${publicationData.certificates}, статей ${publicationData.articles}, в т.ч. в базе Scopus и Web of Science ${publicationData.scopus}, с квартилем не ниже Q3 ${publicationData.webScience}.`,
        }));
    }, [publicationData]);

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
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    boxShadow: 3,
                    padding: 4,
                    maxWidth: 650,
                    width: "100%",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: 2,
                        textAlign: "center",
                    }}
                >
                    Государственная премия в области науки и техники КР
                </Typography>
                <Typography
                    sx={{
                        fontSize: "18px",
                        fontWeight: "medium",
                        marginBottom: 3,
                        textAlign: "center",
                    }}
                >
                    Регистрационный лист научной секции "Развитие
                    инженерно-технических, математических, горно-геологических
                    наук"
                </Typography>
                <Grid container spacing={2} alignSelf="center">
                    <Grid item xs={7}>
                        <TextField
                            label="Дата поступления"
                            type="date"
                            fullWidth
                            helperText="Нажмите на иконку календаря для выбора даты"
                            InputLabelProps={{shrink: true}}
                            value={formData.submissionDate}
                            
                            onChange={(e) =>
                                handleInputChange(
                                    "submissionDate",
                                    e.target.value
                                )
                            }
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Наименование работы (разработки)"
                            fullWidth
                            value={formData.workName}
                            onChange={(e) =>
                                handleInputChange("workName", e.target.value)
                            }
                            required
                        />
                    </Grid>
                    {formData.applicants.map((applicant, index) => (
                        <Grid
                            container
                            item
                            xs={12}
                            key={applicant.id}
                            sx={{
                                border: "1px solid #ccc",
                                borderRadius: 2,
                                padding: 2,
                                position: "relative",
                                margin: "16px 10px 0",
                            }}
                        >
                            <Typography
                                sx={{
                                    position: "absolute",
                                    top: "-10px",
                                    left: "10px",
                                    background: "#fff",
                                    padding: "0 8px",
                                    fontSize: "14px",
                                    color: "grey",
                                }}
                            >
                                Соискатель
                            </Typography>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ФИО соискателя"
                                    value={applicant.fullName}
                                    onChange={(e) =>
                                        handleApplicantChange(
                                            index,
                                            "fullName",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sx={{marginTop: 2}}>
                                <TextField
                                    fullWidth
                                    label="Учёная степень, ученое звание, специальное звание"
                                    value={applicant.specialTitle}
                                    onChange={(e) =>
                                        handleApplicantChange(
                                            index,
                                            "specialTitle",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </Grid>
                            <IconButton
                                color="error"
                                onClick={() => removeApplicant(index)}
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "-40px",
                                    transform: "translateY(-50%)",
                                }}
                                disabled={formData.applicants.length === 1}
                            >
                                <Delete />
                            </IconButton>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button
                            startIcon={<Add />}
                            variant="outlined"
                            onClick={addApplicant}
                            fullWidth
                            disabled={formData.applicants.length >= 3}
                        >
                            Добавить соискателя
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Направление и характер работы (область науки и техники)"
                            multiline
                            rows={3}
                            fullWidth
                            value={formData.workDirection}
                            onChange={(e) =>
                                handleInputChange(
                                    "workDirection",
                                    e.target.value
                                )
                            }
                            required
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            label="Кол-во публикаций, учебников, патентов и т.д."
                            multiline
                            rows={3}
                            fullWidth
                            value={formData.additinalInfo}
                            onChange={(e) =>
                                handleInputChange(
                                    "additinalInfo",
                                    e.target.value
                                )
                            }
                            required
                        />
                    </Grid> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0px",
                            alignItems: "center",
                            border: "1px solid rgba(0, 0, 0, 0.26)",
                            borderRadius: "4px",
                            color: "rgba(0, 0, 0, 0.87)",
                            margin: "16px 0 16px 16px",
                            padding: "16.5px 14px",
                        }}
                    >
                        <Typography>Общее кол. публикаций {" "}</Typography>
                        <TextField
                            type="number"
                            value={publicationData.totalPublications}
                            onChange={(e) =>
                                handleTextareaChange(
                                    "totalPublications",
                                    e.target.value
                                )
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            variant="standard"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />
                        <Typography>, в т.ч. учебников</Typography>
                        <TextField
                            type="number"
                            value={publicationData.textbooks}
                            onChange={(e) =>
                                handleTextareaChange(
                                    "textbooks",
                                    e.target.value
                                )
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            variant="standard"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />
                        <Typography>, монографии</Typography>
                        <TextField
                            type="number"
                            value={publicationData.monographs}
                            onChange={(e) =>
                                handleTextareaChange(
                                    "monographs",
                                    e.target.value
                                )
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            variant="standard"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />,
                        <Typography>патентов</Typography>
                        <TextField
                            type="number"
                            value={publicationData.patents}
                            onChange={(e) =>
                                handleTextareaChange("patents", e.target.value)
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            variant="standard"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />
                        <Typography>, авт. свидетельств</Typography>
                        <TextField
                            type="number"
                            variant="standard"
                            value={publicationData.certificates}
                            onChange={(e) =>
                                handleTextareaChange(
                                    "certificates",
                                    e.target.value
                                )
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />
                        <Typography>{"  "}, статей</Typography>
                        <TextField
                            type="number"
                            value={publicationData.articles}
                            onChange={(e) =>
                                handleTextareaChange("articles", e.target.value)
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            variant="standard"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />, 
                        <Typography>{" "}в т.ч. в базе Scopus и Web of Science </Typography>
                        <TextField
                            type="number"
                            value={publicationData.scopus}
                            onChange={(e) =>
                                handleTextareaChange("scopus", e.target.value)
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            variant="standard"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />
                        <Typography>, с квартилем не ниже Q3 </Typography>
                        <TextField
                            type="number"
                            value={publicationData.webScience}
                            onChange={(e) =>
                                handleTextareaChange(
                                    "webScience",
                                    e.target.value
                                )
                            }
                            sx={{width: "40px"}}
                            // placeholder="0"
                            variant="standard"
                            required
                            inputProps={{
                                style: {textAlign: "center", padding: 0},
                            }}
                        />
                        .
                    </Box>
                    <Grid item xs={12}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Отправить заявку
                            </Button>
                        )}
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}
                    {/* <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                padding: "12px",
                                fontWeight: "bold",
                                fontSize: "16px",
                                textTransform: "none",
                            }}
                        >
                            Отправить заявку
                        </Button>
                    </Grid> */}
                </Grid>
            </Box>
        </Box>
    );
};

export default FormPage;
