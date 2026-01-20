import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";

import { Box } from "@mui/material";
import { signUpSchema } from "./signUpsch";
import styles from "./signUpStyles";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";



const SignUpView: React.FC = () => {
    const { showNotification } = useContext(AppLayoutContext);
    const { user, signUp } = useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = ({ user, email, password }: { user: string, email: string; password: string }) => {
       signUp(user, email, password, (err) => {
            if (!err) navigate('/');
            showNotification({
                type: 'error',
                title: 'Erro ao cadastrar',
                message: 'Erro ao cadastrar',
            });
        });
    };

    return (
        <styles.Container>
            <SysForm schema={signUpSchema} onSubmit={handleSubmit} debugAlerts={false}>
                <styles.FormWrapper>
                    <SysTextField name="user" label="Usuário" fullWidth placeholder="Digite seu usuário" />
                    <SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
                    <SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
                    <SysTextField label="Confirmar Senha" fullWidth name="confirmPassword" placeholder="Digite sua senha" type="password" />
                    <Box />
                    <SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
                        Cadastrar
                    </SysFormButton>
                </styles.FormWrapper>
            </SysForm>
        </styles.Container>
    );
};

export default SignUpView;