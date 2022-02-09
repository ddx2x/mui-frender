import tree, { treeSetting } from '../tree/tree';
import checkbox, { checkboxSetting } from './checkbox';
import checkboxs, { checkboxsSetting } from './checkboxs';
import collector, { collectorSetting } from './collector';
import color from './color';
import date, { dateSetting } from './date';
import dateRange, { dateRangeSetting } from './dateRange';
import html from './html';
import imageInput, { imageInputSetting } from './imageInput';
import input, { inputSetting } from './input';
import list from './list';
import map from './map';
import multiSelect, { multiSelectSetting } from './multiSelect';
import radio, { radioSetting } from './radio';
import select, { selectSetting } from './select';
import slider, { sliderSetting } from './slider';
import switchWidget, { switchSetting } from './switch';
import time from './time';
import timeRange from './timeRange';
import transfer, { transferSetting } from './transfer';

export const widgets = {
	list,
	map,
	html,
	input,
	radio,
	select,
	multiSelect,
	checkbox,
	checkboxs,
	date,
	dateRange,
	tree,
	transfer,
	time,
	timeRange,
	imageInput,
	color,
	switchWidget,
	collector,
	slider,
};

export const defaultWidgetNameList = Object.keys(widgets);

const htmlSetting = {
	text: 'HTML',
	name: 'html',
	schema: {
		title: 'HTML',
		type: 'string',
		widget: 'html',
	},
	setting: {
		default: {
			title: '展示内容',
			type: 'string',
		},
		width: {
			title: '元素宽度',
			type: 'string',
			placeholder: 'eg 50%',
		},
	},
};

export const materialUIWidgetsSettings = [
	inputSetting,
	selectSetting,
	multiSelectSetting,
	radioSetting,
	switchSetting,
	checkboxSetting,
	checkboxsSetting,
	dateSetting,
	dateRangeSetting,
	treeSetting,
	transferSetting,
	// timeSetting,
	// colorSetting,
	collectorSetting,
	htmlSetting,
	imageInputSetting,
	sliderSetting,
];

export const materialUIWidgets = {
	input,
	checkbox,
	checkboxs,
	select,
	multiSelect,
	radio,
	date,
	tree,
	transfer,
	time,
	dateRange,
	timeRange,
	html,
	imageInput,
	// time,
	// color,
	switchWidget,
	collector,
	slider,
};
