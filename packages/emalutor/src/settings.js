// import {
// 	defaultSettings,
// 	defaultCommonSettings,
// 	defaultGlobalSettings,
// } from 'fr-generator';

// #Mui 导入自定义组件
import {
	aceWidgets,
	aceWidgetsSettings,
} from '@lz/e-form-render/es/widgets/ace';
import {
	materialUIWidgets,
	materialUIWidgetsSettings,
} from '@lz/e-form-render/es/widgets/material-ui';
import {
	opsWidgets,
	opsWidgetsSettings,
} from '@lz/e-form-render/es/widgets/ops';
import {
	tableWidgets,
	tableWidgetsSettings,
} from '@lz/e-form-render/es/widgets/table';

// https://sourcegraph.com/github.com/alibaba/x-render@master/-/blob/tools/schema-generator/src/Settings/index.js
export const commonSettings = {
	$id: {
		title: 'ID',
		description: '字段名称/英文',
		type: 'string',
		widget: 'idInput',
		required: true,
	},
	title: {
		title: '标题',
		type: 'string',
	},
};

export const layouts = [
	{
		text: '对象',
		name: 'object',
		schema: {
			title: '对象',
			type: 'object',
			properties: {},
		},
		setting: {
			container: {
				title: '容器',
				type: 'any',
				label: 'container',
				enum: ['card', 'default'],
				enumNames: ['卡片', '默认'],
				default: 'default',
			},
			layout: {
				title: '卡片布局',
				type: 'any',
				label: 'layout',
				enum: ['horizontal', 'vertical'],
				enumNames: ['水平', '垂直'],
				default: 'vertical',
			},
			flex: {
				title: 'flex',
				type: 'string',
				default: '',
			},
		},
	},
	{
		text: '常规列表',
		name: 'list',
		schema: {
			title: '数组',
			type: 'array',
			items: {
				type: 'object',
				properties: {},
			},
		},
		setting: {
			items: {
				type: 'object',
				hidden: '{{true}}',
			},
			min: {
				title: '最小长度',
				type: 'number',
			},
			max: {
				title: '最大长度',
				type: 'number',
			},
			props: {
				title: '选项',
				type: 'object',
				properties: {
					foldable: {
						title: '是否可折叠',
						type: 'boolean',
					},
					hideDelete: {
						title: '隐藏删除按钮',
						type: 'string',
					},
					hideAdd: {
						title: '隐藏新增/复制按钮',
						type: 'string',
					},
				},
			},
		},
	},
	{
		text: '简单列表',
		name: 'simpleList',
		schema: {
			title: '数组',
			type: 'array',
			widget: 'simpleList',
			items: {
				type: 'object',
				properties: {},
			},
		},
		setting: {
			items: {
				type: 'object',
				hidden: '{{true}}',
			},
			min: {
				title: '最小长度',
				type: 'number',
			},
			max: {
				title: '最大长度',
				type: 'number',
			},
			props: {
				title: '选项',
				type: 'object',
				properties: {
					foldable: {
						title: '是否可折叠',
						type: 'boolean',
					},
					hideTitle: {
						title: '隐藏标题',
						type: 'boolean',
					},
					hideDelete: {
						title: '隐藏删除按钮',
						type: 'string',
					},
					hideAdd: {
						title: '隐藏新增/复制按钮',
						type: 'string',
					},
				},
			},
		},
	},
	{
		text: '表格列表',
		name: 'tableList',
		schema: {
			title: '数组',
			type: 'array',
			widget: 'tableList',
			items: {
				type: 'object',
				properties: {},
			},
		},
		setting: {
			items: {
				type: 'object',
				hidden: '{{true}}',
			},
			min: {
				title: '最小长度',
				type: 'number',
			},
			max: {
				title: '最大长度',
				type: 'number',
			},
			props: {
				title: '选项',
				type: 'object',
				properties: {
					foldable: {
						title: '是否可折叠',
						type: 'boolean',
					},
					hideDelete: {
						title: '隐藏删除按钮',
						type: 'string',
					},
					hideAdd: {
						title: '隐藏新增/复制按钮',
						type: 'string',
					},
				},
			},
		},
	},
];

let settings = [
	{
		title: '展示表格',
		widgets: tableWidgetsSettings,
	},
	{
		title: 'ops',
		widgets: opsWidgetsSettings,
	},
	{
		title: 'Ace编辑器',
		widgets: aceWidgetsSettings,
	},
	{
		title: 'Material UI',
		widgets: materialUIWidgetsSettings,
	},
	{
		title: '布局组件',
		widgets: layouts,
	},
];

export const widgets = Object.assign(
	materialUIWidgets,
	aceWidgets,
	opsWidgets,
	tableWidgets
);

export const concatD = settings;
// export const concatD = settings.concat(defaultSettings);
