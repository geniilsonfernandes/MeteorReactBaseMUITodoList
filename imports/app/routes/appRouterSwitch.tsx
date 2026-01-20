import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import AuthContext, { IAuthContext } from '../authProvider/authContext';
import sysRoutes from './routes';
import ScreenRouteRender from './screenRouteRender';
import { subjectRouter } from '/imports/analytics/analyticsSubscriber';
import { getUser } from '/imports/libs/getUser';
import SignInView from '/imports/modules/auth/pages/signIn/signInView';
import { IRoute } from '/imports/modules/modulesTypings';
import { segurancaApi } from '/imports/security/api/segurancaApi';
import { NotFound } from '/imports/sysPages/pages/notFound/notFound';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { isLoggedIn, userLoading, user } = useContext<IAuthContext>(AuthContext);
	const location = useLocation();
	const params = useParams();

	useEffect(() => {
		subjectRouter.next({ pathname: location.pathname, params, user });
	}, [location, params, user]);
	
	const getProtectedRouteElement = (route: IRoute) => {
		if(!route.isProtected) return <ScreenRouteRender {...route} />;
		if (!isLoggedIn) return <ScreenRouteRender component={SignInView} templateVariant="None" />;
		
		const hasAccess = segurancaApi.podeAcessarRecurso(getUser(), ...(route.resources || []));
		return hasAccess ? <ScreenRouteRender {...route} /> : <ScreenRouteRender component={SignInView} templateVariant="None" />;
	};
	
	if (!sysRoutes.checkIfRouteExists(location.pathname)) return <NotFound />;	

	if (userLoading) return <SysLoading size="large" label="Carregando..." />;
	
	return (
		<Routes>
			{sysRoutes.getRoutes().map((route) => (
				<Route
					key={route.path}
					path={route.path as string}
					element={getProtectedRouteElement(route)}
				/>
			))}
		</Routes>
	);
});
