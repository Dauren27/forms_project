import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {InputNumeric} from "../../components/InputNumeric/InputNumeric";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup.js";
import * as yup from "yup";

const ExpertFormPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(null);

    const [data, setData] = useState({});

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        mode: "all",
        defaultValues: {
            relevanceScore: data?.relevanceScore,
            resultsAndNoveltyScore: data?.resultsAndNoveltyScore,
            practicalSignificanceScore: data?.practicalSignificanceScore
                ? data.practicalSignificanceScore
                : "",
            publicationsCompletenessScore: data?.publicationsCompletenessScore
                ? data.publicationsCompletenessScore
                : "",
            implementationProspectsScore: data?.implementationProspectsScore
                ? data.implementationProspectsScore
                : "",
            conclusion: "",
        },
        resolver: yupResolver(
            yup.object().shape({
                relevanceScore: yup
                    .string()
                    .nullable()
                    .test(
                        "is-positive",
                        "Оценка должна быть больше 0",
                        (value) => !value || parseInt(value, 10) > 0
                    )
                    .test(
                        "max-value",
                        "Оценка должна быть не больше 4",
                        (value) => !value || parseInt(value, 10) <= 4
                    ),
                resultsAndNoveltyScore: yup
                    .string()
                    .nullable()
                    .test(
                        "is-positive",
                        "Оценка должна быть больше 0",
                        (value) => !value || parseInt(value, 10) > 0
                    )
                    .test(
                        "max-value",
                        "Оценка должна быть не больше 4",
                        (value) => !value || parseInt(value, 10) <= 4
                    ),
                practicalSignificanceScore: yup
                    .string()
                    .nullable()
                    .test(
                        "is-positive",
                        "Оценка должна быть больше 0",
                        (value) => !value || parseInt(value, 10) > 0
                    )
                    .test(
                        "max-value",
                        "Оценка должна быть не больше 5",
                        (value) => !value || parseInt(value, 10) <= 5
                    ),
                publicationsCompletenessScore: yup
                    .string()
                    .nullable()
                    .test(
                        "is-positive",
                        "Оценка должна быть больше 0",
                        (value) => !value || parseInt(value, 10) > 0
                    )
                    .test(
                        "max-value",
                        "Оценка должна быть не больше 5",
                        (value) => !value || parseInt(value, 10) <= 5
                    ),
                implementationProspectsScore: yup
                    .string()
                    .nullable()
                    .test(
                        "is-positive",
                        "Оценка должна быть больше 0",
                        (value) => !value || parseInt(value, 10) > 0
                    )
                    .test(
                        "max-value",
                        "Оценка должна быть не больше 5",
                        (value) => !value || parseInt(value, 10) <= 5
                    ),
            })
        ),
    });

    const submit = async (formData) => {
        setSubmitError(null);
        setSubmitLoading(true);
        try {
            const token = JSON.parse(sessionStorage.getItem("token"));

            const response = await fetch(
                `https://scientific-registration.onrender.com/reviews/${id}/set-scores`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            navigate("/expert/list");
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setLoadingError(null);
            try {
                const token = JSON.parse(sessionStorage.getItem("token"));

                const response = await fetch(
                    `https://scientific-registration.onrender.com/reviews/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.statusText}`);
                }
                const datta = await response.json();
                setData(datta);
            } catch (error) {
                setLoadingError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            reset({
                relevanceScore: data?.relevanceScore || "",
                resultsAndNoveltyScore: data?.resultsAndNoveltyScore || "",
                practicalSignificanceScore:
                    data?.practicalSignificanceScore || "",
                publicationsCompletenessScore:
                    data?.publicationsCompletenessScore || "",
                implementationProspectsScore:
                    data?.implementationProspectsScore || "",
                conclusion: "",
            });
        }
    }, [data, reset]);

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

    if (loadingError) {
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
                Ошибка загрузки: {loadingError}
            </Typography>
        );
    }

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
                onSubmit={handleSubmit(submit)}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    boxShadow: 3,
                    padding: 4,
                    maxWidth: 650,
                    width: "100%",
                }}
            >
                <Button
                    onClick={() => navigate("/expert/list")}
                    variant="contained"
                    color="primary"
                    sx={{marginBottom: 2}}
                >
                    Назад
                </Button>

                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: 1,
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
                    Экспертиза материалов научных работ в секции "Развитие
                    инженерно-технических, математических, горно-геологических
                    наук"
                </Typography>

                <Grid container spacing={2} alignSelf="center">
                    <Grid item xs={12}>
                        <Typography sx={{padding: "5px"}}>
                            Наименование работы (разработки):
                        </Typography>
                        <Typography
                            sx={{
                                border: "1px solid #000",
                                padding: "10px",
                                borderRadius: "2px",
                                fontWeight: "semi-bold",
                            }}
                        >
                            {data?.workName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{padding: "5px"}}>
                            Соответствие актуальности и цели работы (разработки)
                            государственным программам и мировым трендам
                            развития науки и техники *
                        </Typography>
                        <InputNumeric
                            control={control}
                            name="relevanceScore"
                            placeholder="Введите оценку от 1 до 4"
                            errors={errors?.relevanceScore?.message}
                            isDebounce
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{padding: "5px"}}>
                            Уровень и достоверность результатов, соответствие
                            научной новизны требованиям современной науки *
                        </Typography>
                        <InputNumeric
                            control={control}
                            name="resultsAndNoveltyScore"
                            placeholder="Введите оценку от 1 до 4"
                            errors={errors?.resultsAndNoveltyScore?.message}
                            isDebounce
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{padding: "5px"}}>
                            Научно-практическая значимость полученных
                            результатов *
                        </Typography>
                        <InputNumeric
                            control={control}
                            name="practicalSignificanceScore"
                            placeholder="Введите оценку от 1 до 5"
                            errors={errors?.practicalSignificanceScore?.message}
                            isDebounce
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{padding: "5px"}}>
                            Масштаб публикаций и их вклад в результатах
                            работы(разработки) *
                        </Typography>
                        <InputNumeric
                            control={control}
                            name="publicationsCompletenessScore"
                            placeholder="Введите оценку от 1 до 5"
                            errors={
                                errors?.publicationsCompletenessScore?.message
                            }
                            isDebounce
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{padding: "5px"}}>
                            Потенциал внедрения *
                        </Typography>
                        <InputNumeric
                            control={control}
                            name="implementationProspectsScore"
                            placeholder="Введите оценку от 1 до 5"
                            errors={
                                errors?.implementationProspectsScore?.message
                            }
                            isDebounce
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {submitLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Сохранить
                            </Button>
                        )}
                    </Grid>
                    {submitError && (
                        <Grid item xs={12}>
                            <Typography color="error">{submitError}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default ExpertFormPage;
