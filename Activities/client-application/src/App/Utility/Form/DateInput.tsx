import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {ReactDatePicker, ReactDatePickerProps} from 'react-datepicker';


export default function DateInput(props :Partial<ReactDatePickerProps>){ //partial type to make properties in date picker optional
    const[field, meta,helpers] = useField(props.name!);

    return(
        <Form.Field error={meta.touched && !!meta.error}> 
            <DatePicker // Javascript date picker object
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null } // If value exists in field value set new date, else set null
                onChange = {value => helpers.setValue(value)}

            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null }

        </Form.Field>
    )

}