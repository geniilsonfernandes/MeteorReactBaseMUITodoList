import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

export const todosMenuItemList: (IAppMenu | null)[] = [
    {
        path: '/todos',
        name: 'Todos',
        icon: <SysIcon name={'task'} />
    }
];
