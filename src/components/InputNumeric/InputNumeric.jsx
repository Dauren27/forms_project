import {NumericFormat} from "react-number-format";
import {Controller} from "react-hook-form";
import {debounce} from "lodash";
import React from "react";
import {Box, Typography} from "@mui/material";

export function InputNumeric(props) {
    const onChangeType = (onChange, e) => {
        if (props.beforeChange) {
            props.beforeChange(e);
        }

        onChange(e);
    };

    const numericFormatProps = () => {
        return {
            icon: props.icon,
            placeholder: props.placeholder,
            isAllowed: props.isAllowed,
            allowNegative: false,
            decimalScale: props.decimalScale ?? 0,
            decimalSeparator: props.decimalSeparator,
            fixedDecimalScale: props.fixedDecimalScale,
            thousandSeparator:
                props.thousandSeparator && props.thousandSeparator,
            allowLeadingZeros:
                props.allowLeadingZeros && props.allowLeadingZeros,
            disabled: props.isDisabled,
            min: 0,
            autoFocus: false,
            prefix: props.prefix,
        };
    };

    const wrapperStyles = {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        position: "relative",
    };

    const inputStyles = {
        border: props.errors ? "1px solid red" : "1px solid #c4c4c4",
        borderRadius: "4px",
        padding: "12px",
        fontSize: "16px",
        outline: props.errors ? "1px solid red" : "none",
        "&:focus": {
            outline: "2px solid #1976d2",
        },
    };

    if (props.control && props.name) {
        return (
            <Controller
                control={props.control}
                name={props.name}
                render={({field: {ref, ...newField}}) => (
                    <Box sx={wrapperStyles}>
                        <NumericFormat
                            {...newField}
                            {...numericFormatProps()}
                            type="text"
                            getInputRef={ref}
                            renderText={(value) => <p>{value}</p>}
                            style={inputStyles}
                            required
                            onChange={
                                props.isDebounce
                                    ? debounce(
                                          (e) =>
                                              onChangeType(
                                                  newField.onChange,
                                                  e
                                              ),
                                          300
                                      )
                                    : (e) => onChangeType(newField.onChange, e)
                            }
                        />
                        {props.errors && (
                            <Typography sx={{color: "red", fontSize: "14px"}}>
                                {props.errors}
                            </Typography>
                        )}
                    </Box>
                )}
            />
        );
    }

    return (
        <Box sx={wrapperStyles}>
            <NumericFormat
                {...numericFormatProps()}
                value={props.value}
                style={inputStyles}
                onChange={
                    props.isDebounce && props.onChange
                        ? debounce(props.onChange, 300)
                        : props.onChange
                }
            />
            {props.errors && (
                <Typography sx={{color: "red", fontSize: "14px"}}>
                    {props.errors}
                </Typography>
            )}
        </Box>
    );
}
