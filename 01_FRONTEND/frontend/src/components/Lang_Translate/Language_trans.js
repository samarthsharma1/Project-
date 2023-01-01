import axios from 'axios';
import { useState } from "react";

import { Row, Form, Stack, Button } from "react-bootstrap";

import Options from "./Options";


const Language_Translator = () => {
    const [isFromCodeValid, setIsFromCodeValid] = useState(false)
    const [isToCodeValid, setIsToCodeValid] = useState(false)
    const [result, setResult] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);


    function fromCodeChangeHandler(e) {
        const fromCode = e.target.value;
        // console.log(fromCode)
        if (fromCode !== 'from') {
            setIsFromCodeValid(true)
        }

    }

    function ToCodeHandler(e) {
        const toCode = e.target.value;
        if (toCode !== 'to') {
            setIsToCodeValid(true)
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // console.log(e.target.from_text.value ,e.target.from_code.value)

        const from_text = e.target.from_text.value.trim();
        const from_code = e.target.from_code.value;
        const to_code = e.target.to_code.value;

        if (isFromCodeValid && isToCodeValid) {
            // console.log(from_code,to_code,from_text)
            setIsLoading(true);

            try {
                const response = await axios.post('http://localhost:5000/translate/change', {
                    sourceText: from_text,
                    sourceLang: from_code,
                    targetLang: to_code
                })
                // console.log(response);

                setResult(response.data.to)

            }
            catch (err) {
                console.log(err)
            }

            setIsLoading(false);
        }
        else {
            window.alert('plaese select the languages to change')
        }

    }

    return (<Form onSubmit={submitHandler} className='m-4'>
        <Row className="mb-3">
            <Stack direction='horizontal' gap={3}>
                <Form.Select id='from_code' onChange={fromCodeChangeHandler}>
                    <option>from</option>
                    <Options />
                </Form.Select>
                <Form.Select id='to_code' onChange={ToCodeHandler}>
                    <option>to</option>
                    <Options />
                </Form.Select>

            </Stack>
        </Row>
        <Row className="mb-3">
            <Stack direction='horizontal' gap={4}>
                <Form.Control as="textarea" rows={8} id='from_text' />
                <Form.Control as="textarea" rows={8} id='to_text' value={result} readOnly />

            </Stack>
        </Row>
        <Row className="mb-3">
            <Button type='submit' style={{ width: '10rem', height: '3rem' }} className="m-auto">
                {isLoading && 'Loading ...'}
                {!isLoading && 'Convert'}
            </Button>
        </Row>
    </Form>)
}

export default Language_Translator;