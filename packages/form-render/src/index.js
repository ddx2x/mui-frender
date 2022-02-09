import React from 'react';
import FRCore from './form-render-core/src';
// #Mui 导出自定义组件 widgets
import { widgets as aceWidgets } from './widgets/ace';
import { widgets as defaultWidgets } from './widgets/material-ui';
import { widgets as opsWidgets } from './widgets/ops';
import { widgets as tabletWidgets } from './widgets/table';

export {
	connectForm,
	createWidget,
	mapping,
	useForm,
} from './form-render-core/src';
export { defaultWidgets as widgets, aceWidgets, opsWidgets, tabletWidgets };

// #Mui 解构自定义组件 widgets
const FR = ({ widgets, configProvider, ...rest }) => {
	return (
		<FRCore
			widgets={{
				...defaultWidgets,
				...widgets,
				...aceWidgets,
				...opsWidgets,
				...tabletWidgets,
			}}
			{...rest}
		/>
	);
};

export default FR;
