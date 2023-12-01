import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const MyDateTimePicker = ({ value, onChange, defaultValue }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                    label="Deadline"
                    value={defaultValue ? dayjs(defaultValue) : value}
                    onChange={onChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default MyDateTimePicker;
