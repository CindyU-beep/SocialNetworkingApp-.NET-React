import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props{
    placeholder: string;
    name: string;
    options: any;
    label?: string;

}

export default function SelectInput(props :Props){
    const[field, meta, helpers] = useField(props.name);

    return(
        <Form.Field error={meta.touched && !!meta.error}> {/* Check for error*/}
            <Label>{props.label}</Label>
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(event,data)=>helpers.setValue(data.value)}
                onBlur={()=> helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null }
        </Form.Field>
    )

}