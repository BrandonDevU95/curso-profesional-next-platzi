import { useEffect, useState } from 'react';

import axios from 'axios';

const useFetch = (endpoint) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios(endpoint);
				setData(result.data);
			} catch (error) {
				setError(true);
			}
		};
		fetchData();
	}, [endpoint]);

	return { data, error };
};

export default useFetch;
