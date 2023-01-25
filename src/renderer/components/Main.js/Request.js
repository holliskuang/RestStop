export default function Request () {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState('');
    const [body, setBody] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };
    
    const handleMethodChange = (event) => {
        setMethod(event.target.value);
    };
    
    const handleHeadersChange = (event) => {
        setHeaders(event.target.value);
    };
    
    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setError(false);
        setResponse('');
        fetch(url, {
        method,
        headers: headers
            .split('\n')
            .filter((line) => line.trim() !== '')
            .reduce((headers, line) => {
            const [key, value] = line.split(':');
            return {
                ...headers,
                [key.trim()]: value.trim(),
            };
}