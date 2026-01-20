import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { Accounts } from 'meteor/accounts-base';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EmailVerify = () => {
	const { token } = useParams();
	const navigate = useNavigate();

	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
	const [errorMessage, setErrorMessage] = useState('');
	const [countdown, setCountdown] = useState(3);

	useEffect(() => {
		if (!token) {
			setStatus('error');
			setErrorMessage('Token inválido.');
			return;
		}

		Accounts.verifyEmail(token, (err) => {
			if (err) {
				setStatus('error');
				setErrorMessage(err.message || 'Erro ao verificar o e-mail.');
			} else {
				setStatus('success');
			}
		});
	}, [token]);

	useEffect(() => {
		if (status !== 'success') return;

		if (countdown === 0) {
			navigate('/');
			return;
		}

		const timer = setTimeout(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [status, countdown, navigate]);

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			marginX="auto"
			textAlign="center"
			p={2}
		>
			{status === 'loading' && (
				<>
					<CircularProgress />
					<Typography variant="h6" mt={2}>
						Verificando seu e-mail...
					</Typography>
				</>
			)}

			{status === 'success' && (
				<>
					<Typography variant="h4" color="success.main" mb={2}>
						✅ E-mail verificado!
					</Typography>

					<Typography variant="body1" mb={1}>
						Seu e-mail foi verificado com sucesso.
					</Typography>

					<Typography variant="body2" color="text.secondary" mb={3}>
						Você será redirecionado para a página inicial em {countdown} segundos...
					</Typography>

					<Button variant="contained" color="primary" onClick={() => navigate('/')}>
						Ir agora
					</Button>
				</>
			)}

			{status === 'error' && (
				<>
					<Alert severity="error" sx={{ mb: 3 }}>
						{errorMessage}
					</Alert>
					<Button variant="contained" color="primary" onClick={() => navigate('/')}>
						Voltar para Início
					</Button>
				</>
			)}
		</Box>
	);
};