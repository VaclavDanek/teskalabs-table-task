import { Module } from "asab_webui_components";

import { TableScreen } from './TableScreen.jsx';
import { UserDetailScreen } from './UserDetailScreen.jsx';

export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule");

		app.Router.addRoute({
			path: "/",
			end: false,
			name: 'Table',
			component: TableScreen,
		});

		app.Navigation.addItem({
			name: "Table",
			icon: 'bi bi-table',
			url: "/",
		});

		app.Modules[0].I18nService.i18n.then((t) => {
			app.Router.addRoute({
				path: '/user/:id',
				end: true,
				name: t('UserDetailScreen|Title'),
				component: UserDetailScreen,
			})
		})
	}
}
