import ipv4, { ipv4Setting } from './ipv4';
import ipv6, { ipv6Setting } from './ipv6';

export const widgets = {
	ipv4,
	ipv6,
};

export const opsWidgetsSettings = [ipv4Setting, ipv6Setting];
export const opsWidgets = {
	ipv4,
	ipv6,
};
