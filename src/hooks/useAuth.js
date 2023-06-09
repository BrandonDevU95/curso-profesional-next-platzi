import React, { createContext, useContext, useState } from 'react';

import Cookie from 'js-cookie'; //Nos ayuda asignar a nuestro navegador las cookies que esté recibiendo en el momento de la autenticación
import axios from 'axios'; //Para el manejo de las peticiones como GET, PUT, POST, DELETE
import endPoints from '@services/api/';

const AuthContext = createContext(); //Se crea un nuevo context gracias a la api de react
//Se crea la encapsulación de nuestra aplicación
export function ProviderAuth({ children }) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
//Permite exponer cierta información que se estará requiriendo
export const useAuth = () => {
	return useContext(AuthContext);
};
//Captar la información del usuario
function useProvideAuth() {
	const [user, setUser] = useState(null);

	const signIn = async (email, password) => {
		const options = {
			headers: {
				accept: '*/*',
				'Content-Type': 'application/json',
			},
		};
		const { data: access_token } = await axios.post(
			endPoints.auth.login,
			{ email, password },
			options
		);
		if (access_token) {
			const token = access_token.access_token;
			Cookie.set('token', token, { expires: 5 });

			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			const { data: user } = await axios.get(endPoints.auth.profile);
			setUser(user);
		}
	};

	return {
		user,
		signIn,
	};
}
