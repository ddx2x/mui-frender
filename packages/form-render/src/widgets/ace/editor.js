// https://github.com/securingsincity/react-ace/blob/master/docs/Ace.md
// https://ace.c9.io/#nav=api&api=editor
// https://github.com/ajaxorg/ace-builds
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

const languages = [
	'apache_conf',
	'asl',
	'assembly_x86',
	'batchfile',
	'c_cpp',
	'clojure',
	'coffee',
	'csharp',
	'csp',
	'css',
	'dart',
	'diff',
	'django',
	'dockerfile',
	'dot',
	'ejs',
	'elm',
	'erlang',
	'fsl',
	'ftl',
	'gitignore',
	'golang',
	'graphqlschema',
	'groovy',
	'haml',
	'haskell_cabal',
	'haskell',
	'hjson',
	'html',
	'ini',
	'io',
	'java',
	'yaml',
	'javascript',
	'json',
	'json5',
	'jsp',
	'jssm',
	'jsx',
	'julia',
	'kotlin',
	'latex',
	'less',
	'lisp',
	'lua',
	'luapage',
	'makefile',
	'markdown',
	'mask',
	'mediawiki',
	'mysql',
	'nginx',
	'pascal',
	'perl',
	'pgsql',
	'plain_text',
	'powershell',
	'properties',
	'protobuf',
	'puppet',
	'python',
	'r',
	'rst',
	'sass',
	'scala',
	'sh',
	'snippets',
	'sql',
	'sqlserver',
	'svg',
	'swift',
	'tex',
	'text',
	'textile',
	'toml',
	'typescript',
	'vbscript',
	'verilog',
	'xml',
	'yaml',
];

const themes = [
	'dracula',
	'monokai',
	'github',
	'tomorrow',
	'kuroir',
	'twilight',
	'xcode',
	'textmate',
	'solarized_dark',
	'solarized_light',
	'terminal',
];

export default function aceEditor({ schema, value, onChange }) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState('tomorrow');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setMounted(true);
		}
	}, []);

	useEffect(() => {
		setTheme(schema.theme);
	}, [schema.theme]);

	if (mounted) {
		const AceEditor = require('react-ace').default;

		languages.forEach((lang) => {
			require(`ace-builds/src-min-noconflict/mode-${lang}`);
			require(`ace-builds/src-min-noconflict/snippets/${lang}`);
		});

		themes.forEach((theme) =>
			require(`ace-builds/src-min-noconflict/theme-${theme}.js`)
		);

		/*eslint-disable no-alert, no-console */
		require('ace-builds/src-min-noconflict/ext-searchbox');
		require('ace-builds/src-min-noconflict/ext-language_tools');

		const props = {
			mode: schema.mode || 'yaml',
			theme: theme,
			height: schema.aceHeight || '400px',
			width: schema.aceWidth || '800px',
			tabSize: schema.tabSize || 2,
			setOptions: {
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: true,
				showLineNumbers: true,
			},
		};

		return (
			<Grid container justifyContent='center' alignItems='center'>
				<Card>
					<CardContent>
						<AceEditor
							onChange={onChange}
							value={value}
							highlightActiveLine
							showPrintMargin
							wrapEnabled
							editorProps={{ $blockScrolling: true }}
							{...props}
						/>
					</CardContent>
				</Card>
			</Grid>
		);
	} else {
		return null;
	}
}

export const aceEditorSetting = {
	text: '编辑器',
	name: 'aceEditor',
	schema: {
		title: '编辑器',
		type: 'any',
		widget: 'aceEditor',
	},
	setting: {
		mode: {
			title: '语言格式',
			type: 'any',
			widget: 'select',
			enum: languages,
			enumNames: languages,
			default: 'python',
		},
		theme: {
			title: '主题',
			type: 'any',
			widget: 'select',
			enum: themes,
			enumNames: themes,
			default: 'tomorrow',
		},
		aceHeight: {
			title: '高度',
			type: 'string',
			default: '400px',
		},
		aceWidth: {
			title: '宽度',
			type: 'string',
			default: '800px',
		},
		fontSize: {
			title: '字体大小',
			type: 'number',
			default: 14,
		},
		tabSize: {
			title: 'tab size',
			type: 'number',
			default: 2,
		},
		default: {
			title: '默认值',
			type: 'string',
			default: 'ace editor',
		},
		helperText: {
			title: '提示',
			type: 'string',
			default: '',
		},
	},
};
